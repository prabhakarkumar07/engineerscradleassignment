import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (token) => {
    localStorage.setItem("token", token);
    fetchUserInfo(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
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
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      setUser(null);
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
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
