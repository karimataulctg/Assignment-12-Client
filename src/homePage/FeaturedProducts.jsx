import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useFeaturedProducts from '../hooks/useFeaturedProducts';
import { AuthContext } from '../AuthProvider';
import { FaThumbsUp } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { GiSelfLove } from "react-icons/gi";

const FeaturedProducts = () => {
  const { data: products, isLoading, error, refetch } = useFeaturedProducts();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading featured products. Please try again later.</p>;

  const handleUpvote = (product) => {
    if (!user) {
      navigate('/login');
    } else {
      fetch(`http://localhost:5000/products/${product._id}/upvote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: user.email })
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Product upvoted successfully') {
          Swal.fire('Upvoted!', 'Your vote has been counted.', 'success');
          refetch(); // Refetch product list to update the vote count
        } else {
          Swal.fire('Error', data.message, 'error');
        }
      })
      .catch((error) => Swal.fire('Error', error.message, 'error'));
    }
  };

  return (
    <>
      <h2 className="text-center text-2xl font-bold my-6">Featured Products</h2>
      <div className="featured-products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="card bg-white shadow-md rounded-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">
                  <a href={`/productDetails/${product._id}`} className="hover:underline">{product.name}</a>
                </h3>
                <div className="tags mb-4">
                  {product.tags.map((tag) => (
                    <span key={tag} className="badge badge-secondary mr-2">{tag}</span>
                  ))}
                </div>
                <button
                  onClick={() => handleUpvote(product)}
                  disabled={product.upvotedBy && product.upvotedBy.includes(user?.email)}
                  className="btn btn-primary w-full flex items-center justify-center"
                >
                  <GiSelfLove  className="mr-2" />
                  {product.votes} Votes
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No featured products available.</p>
        )}
      </div>
    </>
  );
};

export default FeaturedProducts;
