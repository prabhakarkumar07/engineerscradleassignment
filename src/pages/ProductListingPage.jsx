import React, { useState, useEffect } from "react";
import {
  ProductCard,
  Pagination,
  NavBar,
  SearchBar,
} from "../components/index";

function ProductListingPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);
        const response = await fetch(
          "https://intern-task-api.bravo68web.workers.dev/api/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAllProducts(data || []);
          setDisplayedProducts(data || []);
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setErrMsg("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    setDisplayedProducts(currentProducts);
  }, [searchTerm, currentPage, allProducts]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= Math.ceil(allProducts.length / productsPerPage)) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (errMsg) {
    return <div>{errMsg}</div>;
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="w-full max-w-screen-lg">
        <NavBar />
      </div>
      <main className="mt-10 flex flex-col items-center w-full max-w-screen-lg">
        <div className="w-full flex justify-center mb-4">
          <SearchBar onSearch={handleSearchChange} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
        {errMsg && <p className="text-red-500">{errMsg}</p>}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(allProducts.length / productsPerPage)}
          onPageChange={handlePageChange}
          className="mt-4"
        />
      </main>
    </div>
  );
}

export default ProductListingPage;
