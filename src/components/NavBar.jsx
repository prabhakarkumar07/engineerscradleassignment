import React from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

function NavBar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 p-2 flex justify-between items-center z-50 gap-4 ">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white ml-3">
        Product
      </h1>

      <p className="text-white  flex flex-1 min-w-0 overflow-hidden overflow-ellipsis  justify-evenly  ">
        {user ? `Logged in as: ${user?.user?.sub}` : "Not logged in"}
      </p>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 mr-3 flex items-center"
      >
        <span className="hidden sm:inline mr-2">Logout</span>
        <IoIosLogOut />
      </button>
    </nav>
  );
}

export default NavBar;
