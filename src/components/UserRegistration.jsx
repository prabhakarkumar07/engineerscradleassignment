import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserRegistration() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
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
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
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
          setErrors({});
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          const data = await response.json();
          setErrors({ apiError: data.message || "Registration failed" });
        }
      } catch (error) {
        console.error("Registration error:", error);
        setErrors({ apiError: "An error occurred. Please try again." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  return (
    <div className="bg-gray-100 w-full h-[40%] max-w-sm mx-auto p-6 flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl text-center font-semibold text-gray-700">
        Registration Form
      </h1>
      {message && <p className="text-green-500">{message}</p>}
      {errors.apiError && <p className="text-red-500">{errors.apiError}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full flex flex-col rounded-lg shadow-lg p-6 justify-center items-center"
      >
        <div className="mb-6 flex flex-col gap-4 w-full">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
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
