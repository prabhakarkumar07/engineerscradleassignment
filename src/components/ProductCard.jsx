import React from "react";

function ProductCard({ product }) {
  return (
    <div className="border p-3 rounded-lg shadow-md bg-white relative transform scale-90 min-w-[200px] sm:max-[80%]">
      {" "}
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full  h-28 object- mb-3 bg-gray-50 transform transition-transform duration-300 hover:scale-110"
        />
        <p className="text-sm font-bold absolute bottom-1 right-1 bg-yellow-200 px-1.5 py-1 rounded-lg transform rotate-[-15deg]">
          ${product.price}
        </p>
      </div>
      <div>
        <h2 className="text-md font-semibold text-center truncate">
          {product.title}
        </h2>
      </div>
    </div>
  );
}

export default ProductCard;
