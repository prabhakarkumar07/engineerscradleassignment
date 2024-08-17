import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (token) => {
    Cookies.set("token", token, { expires: 7 }); // Set token in cookies with a 7-day expiration
    fetchUserInfo(token);
  };

  const logout = () => {
    Cookies.remove("token"); // Remove token from cookies
    setUser(null);
    navigate("/");
  };

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch(
        "https://intern-task-api.bravo68web.workers.dev/api/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        navigate("/product-listing");
      } else {
        setUser(null);
        Cookies.remove("token"); // Remove token if fetch fails
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      setUser(null);
      Cookies.remove("token"); // Remove token if there's an error
      navigate("/");
    }
  };

  useEffect(() => {
    const token = Cookies.get("token"); // Get token from cookies
    if (token) {
      fetchUserInfo(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
