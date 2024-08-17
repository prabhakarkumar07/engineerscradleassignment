import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function UserLogin() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      setError("Both fields are required");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://intern-task-api.bravo68web.workers.dev/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginData.email,
            password: loginData.password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          login(data.token);
          setMessage("Login successful");
          setError("");

          navigate("/");
        } else {
          setError("Login failed: Incorrect email or password");
        }
      } else {
        const data = await response.json();
        setError(data.message || "Login failed: Incorrect email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 w-full max-w-sm mx-auto p-6 h-auto flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-semibold text-gray-700">User Login</h1>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full flex flex-col rounded-lg shadow-lg p-6 justify-center items-center"
      >
        <div className="mb-6 flex flex-col gap-4 w-full">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={loginData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={loginData.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-[60%] bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="mt-4 flex flex-col justify-end items-center">
        <p className="text-gray-700">Don't have an account?</p>
        <button
          onClick={() => navigate("/signup")}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default UserLogin;
