import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useFeaturedProducts from '../hooks/useFeaturedProducts';
import { AuthContext } from '../AuthProvider';
import { FaThumbsUp } from 'react-icons/fa';
import Swal from 'sweetalert2';

const FeaturedProducts = () => {
  const { data: products, isLoading } = useFeaturedProducts();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;

  const handleUpvote = (product) => {
    if (!user) {
      navigate('/login');
    } else {
      // Upvote logic (e.g., send a POST request to the server)
      Swal.fire('Upvoted!', 'Your vote has been counted.', 'success');
    }
  };

  return (
    <div className="featured-products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
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
              disabled={product.owner.email === user?.email}
              className="btn btn-primary w-full flex items-center justify-center"
            >
              <FaThumbsUp className="mr-2" />
              {product.votes} Votes
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;
