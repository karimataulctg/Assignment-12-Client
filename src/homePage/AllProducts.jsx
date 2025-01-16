import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAllProducts from '../hooks/useAllProducts';

const AllProducts = () => {
  const { data: products, isLoading } = useAllProducts();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="all-products-page min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="card bg-white shadow-md rounded-lg overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">
                {product.name}
              </h3>
              <div className="tags mb-4">
                {product.tags.map((tag) => (
                  <span key={tag} className="badge badge-secondary mr-2">{tag}</span>
                ))}
              </div>
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="btn btn-primary w-full"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
