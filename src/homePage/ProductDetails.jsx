import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useProductDetails from '../hooks/useProductDetails';
import { AuthContext } from '../AuthProvider';
import { FaThumbsUp, FaFlag } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Reviews from './Reviews';
import PostReview from './PostReview';

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useProductDetails(id);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details. Please try again later.</p>;

  const handleUpvote = () => {
    if (!user) {
      navigate('/login');
    } else {
      fetch(`https://product-hunt-server-two.vercel.app/products/${id}/upvote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: user.email })
      })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire('Upvoted!', 'Your vote has been counted.', 'success');
        window.location.reload(); // Reload page to see updated vote count
      })
      .catch((error) => Swal.fire('Error', error.message, 'error'));
    }
  };

  const handleReport = () => {
    if (!user) {
      navigate('/login');
    } else {
      fetch(`https://product-hunt-server-two.vercel.app/products/${id}/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.email, reason: "Inappropriate content" }),
      })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire('Reported!', 'This product has been reported.', 'success');
      })
      .catch((error) => Swal.fire('Error', error.message, 'error'));
    }
  };

  return (
    <div className="product-details-page p-6">
      {product ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <img src={product.image} alt={product.name} className="w-full h-96 object-cover mb-4" />
          <p className="text-lg mb-4">{product.description}</p>
          <div className="tags mb-4">
            {product.tags.map((tag) => (
              <span key={tag} className="badge badge-secondary mr-2">{tag}</span>
            ))}
          </div>
          <div className="external-links mb-4">
            {product.externalLinks && (
              <a href={product.externalLinks} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                External Link
              </a>
            )}
          </div>
          <div className="flex items-center mb-4">
            <button
              onClick={handleUpvote}
              disabled={product.owner.email === user?.email}
              className="btn btn-primary flex items-center mr-2"
            >
              <FaThumbsUp className="mr-2" />
              {product.votes} Votes
            </button>
            <button onClick={handleReport} className="btn btn-secondary flex items-center">
              <FaFlag className="mr-2" />
              Report
            </button>
          </div>
          <div className="reviews-section mb-6">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            <Reviews reviews={product.reviews || []} />
          </div>
          <div className="post-review-section">
            <PostReview productId={product._id} />
          </div>
        </>
      ) : (
        <p>Product details not available.</p>
      )}
    </div>
  );
};

export default ProductDetails;
