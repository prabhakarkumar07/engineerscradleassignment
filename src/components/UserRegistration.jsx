import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserRegistration() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://intern-task-api.bravo68web.workers.dev/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (response.ok) {
        setMessage("Registration successful");
        setError("");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 w-full h-[40%] max-w-sm mx-auto p-6 flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl text-center font-semibold text-gray-700">
        Registration Form
      </h1>
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
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-[60%] bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
      <div className="mt-4 flex flex-col justify-end items-center">
        <p className="text-gray-700">Already have an account?</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default UserRegistration;
