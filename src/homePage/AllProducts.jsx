import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAllProducts from "../hooks/useAllProducts";

const AllProducts = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc"); // ✅ Sorting state
  const productsPerPage = 6;

  const { data: products, isLoading, refetch } = useAllProducts(searchTag);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔍 Search Tag:", searchTag);
    console.log("📦 Products:", products);
  }, [searchTag, products]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTag(searchInput);
    setCurrentPage(1);
    refetch();
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  // ✅ Sorting logic before pagination
  const sortedProducts = [...(products || [])].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="all-products-page min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-4 justify-center">
        <input
          type="text"
          placeholder="Search by tag"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="input input-bordered w-64"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {/* Sorting Buttons */}
      <div className="flex justify-center mb-6">
  <select
    className="px-6 py-2 w-64 border rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
    value={sortOrder}
    onChange={(e) => handleSort(e.target.value)}
  >
    <option value="asc">🔼 Ascending</option>
    <option value="desc">🔽 Descending</option>
  </select>
</div>


      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 m-2 gap-6">
  {currentProducts.length > 0 ? (
    currentProducts.map((product) => (
      <div
        key={product._id}
        className="card bg-white shadow-md rounded-lg overflow-hidden flex flex-col" // Added flex-col
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-t-lg h-48 object-cover flex-shrink-0" // Added flex-shrink-0
        />
        <div className="p-4 flex flex-col flex-grow"> {/* Added flex properties */}
          <div className="mb-2">
            <h3 className="text-xl font-bold">{product.name}</h3>
          </div>
          <div className="tags mb-4 flex-grow"> {/* Added flex-grow */}
            {product.tags?.map((tag) => (
              <span key={tag} className="badge badge-secondary mr-2 mb-2">
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={() => navigate(`/productDetails/${product._id}`)}
            className="btn btn-primary w-full mt-auto" // Added mt-auto
          >
            Details
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-red-500 text-center col-span-3">
      No products found.
    </p>
  )}
</div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          className="btn btn-outline"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">Page {currentPage}</span>
        <button
          className="btn btn-outline"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={indexOfLastProduct >= sortedProducts.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
