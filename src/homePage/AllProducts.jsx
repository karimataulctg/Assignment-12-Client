import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAllProducts from '../hooks/useAllProducts';

const AllProducts = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchTag, setSearchTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // ✅ Show 6 products per page

  const { data: products, isLoading, refetch } = useAllProducts(searchTag);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTag(searchInput);
    setCurrentPage(1); // ✅ Reset to page 1 on search
    refetch();
  };

  if (isLoading) return <p>Loading...</p>;

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct) || [];

  return (
    <div className="all-products-page min-h-screen p-6 bg-gray-100">
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
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {/* Products Grid (3 Cards Per Row) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div key={product._id} className="card bg-white shadow-md rounded-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <div className="tags mb-4">
                  {product.tags.map((tag) => (
                    <span key={tag} className="badge badge-secondary mr-2">{tag}</span>
                  ))}
                </div>
                <button
                  onClick={() => navigate(`/productDetails/${product._id}`)}
                  className="btn btn-primary w-full"
                >
                  Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-red-500 text-center col-span-3">No products found.</p>
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
          disabled={indexOfLastProduct >= products?.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
