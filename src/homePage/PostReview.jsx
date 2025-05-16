import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthProvider';
import Swal from 'sweetalert2';

const PostReview = ({ productId }) => {
  const { user } = useContext(AuthContext);
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);

  if (!user) {
    return <p>Loading user information...</p>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const reviewData = {
      productId,
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
      description,
      rating,
      createdAt: new Date(),
    };

    fetch('http://localhost:5000/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire('Review Added', 'Your review has been added successfully', 'success');
        setDescription('');
        setRating(0);
      })
      .catch((error) => Swal.fire('Error', error.message, 'error'));
  };

  return (
    <div className="post-review-section mt-6">
      <h2 className="text-2xl font-bold mb-4">Post a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">Reviewer Name</label>
          <input type="text" value={user?.displayName || ''} className="input input-bordered w-full" readOnly />
        </div>
        <div className="form-control">
          <label className="label">Reviewer Image</label>
          <input type="text" value={user?.photoURL || ''} className="input input-bordered w-full" readOnly />
        </div>
        <div className="form-control">
          <label className="label">Review Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>
        <div className="form-control">
          <label className="label">Rating</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="input input-bordered w-full"
            required
            min="0"
            max="5"
          />
        </div>
        <div className="form-control">
          <button type="submit" className="btn btn-primary w-full">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PostReview;
