import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserRegistration, UserLogin } from "./components/index";
import ProductListingPage from "./pages/ProductListingPage";
import { useAuth } from "./components/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/product-listing" /> : <UserRegistration />
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/product-listing" /> : <UserLogin />}
        />
        <Route
          path="/product-listing"
          element={user ? <ProductListingPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
