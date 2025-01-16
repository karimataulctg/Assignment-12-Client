import React from 'react';

const Reviews = ({ reviews }) => {
  return (
    <div className="reviews-section">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review-card mb-4 p-4 bg-white shadow-md rounded-lg">
            <div className="flex items-center mb-2">
              <img src={review.reviewerImage} alt={review.reviewerName} className="w-10 h-10 rounded-full mr-2" />
              <h3 className="text-lg font-semibold">{review.reviewerName}</h3>
            </div>
            <p className="text-sm mb-2">{review.description}</p>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-2">{review.rating}</span>
              <span>⭐</span>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews available for this product.</p>
      )}
    </div>
  );
};

export default Reviews;
