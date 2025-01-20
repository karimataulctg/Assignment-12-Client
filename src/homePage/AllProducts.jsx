import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAllProducts from '../hooks/useAllProducts';

const AllProducts = () => {
  const [searchInput, setSearchInput] = useState(''); // Input field state
  const [searchTag, setSearchTag] = useState(''); // Actual search state (only updates when search button is clicked)
  
  const { data: products, isLoading, refetch } = useAllProducts(searchTag);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTag(searchInput); // ✅ Set searchTag only when button is clicked
    refetch();
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="all-products-page min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          placeholder="Search by tag"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)} // ✅ Change only input value, not searchTag
          className="input input-bordered w-full mb-2"
        />
        <button type="submit" className="btn btn-primary w-full">
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.length > 0 ? (
          products.map((product) => (
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
          <p className="text-red-500 text-center">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
