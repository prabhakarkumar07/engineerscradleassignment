import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-between mt-4 gap-5">
      {/* Conditionally render Previous button */}
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Previous
        </button>
      )}
      <span>
        Page {currentPage} of {totalPages}
      </span>
      {/* Conditionally render Next button */}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
