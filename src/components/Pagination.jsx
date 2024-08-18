import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div
      className="flex justify-between items-center mt-4  p-2 rounded-md"
      style={{ width: "250px" }}
    >
      {/* Conditionally render Previous button */}
      {currentPage > 1 ? (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-md"
        >
          Previous
        </button>
      ) : (
        <div className="w-24"></div>
      )}

      <span className="text-black text-center">
        {currentPage} of {totalPages}
      </span>

      {/* Conditionally render Next button */}
      {currentPage < totalPages ? (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-md"
        >
          Next
        </button>
      ) : (
        <div className="w-24"></div>
      )}
    </div>
  );
}

export default Pagination;
