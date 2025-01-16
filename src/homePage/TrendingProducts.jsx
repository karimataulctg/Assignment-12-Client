import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useTrendingProducts from '../hooks/useTrendingProducts';
import { AuthContext } from '../AuthProvider';
import { FaThumbsUp } from 'react-icons/fa';
import Swal from 'sweetalert2';

const TrendingProducts = () => {
  const { data: products, isLoading, error } = useTrendingProducts();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products. Please try again later.</p>;

  const handleUpvote = (product) => {
    if (!user) {
      navigate('/login');
    } else {
      // Upvote logic (e.g., send a POST request to the server)
      Swal.fire('Upvoted!', 'Your vote has been counted.', 'success');
    }
  };

  return (
    <div className="trending-products-section p-6">
      <h2 className="text-2xl font-bold mb-6">Trending Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="card bg-white shadow-md rounded-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">
                  <a href={`/product/${product._id}`} className="hover:underline">{product.name}</a>
                </h3>
                <div className="tags mb-4">
                  {product.tags.map((tag) => (
                    <span key={tag} className="badge badge-secondary mr-2">{tag}</span>
                  ))}
                </div>
                <button
                  onClick={() => handleUpvote(product)}
                  disabled={product.owner.email === user?.email}
                  className="btn btn-primary w-full flex items-center justify-center"
                >
                  <FaThumbsUp className="mr-2" />
                  {product.votes} Votes
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No trending products available.</p>
        )}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate('/allProducts')}
          className="btn btn-secondary"
        >
          Show All Products
        </button>
      </div>
    </div>
  );
};

export default TrendingProducts;
