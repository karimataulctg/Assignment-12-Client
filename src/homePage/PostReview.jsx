import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import Swal from 'sweetalert2';

const PostReview = ({ productId }) => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const description = event.target.description.value;
    const rating = event.target.rating.value;

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
        Swal.fire('Review Posted', 'Your review has been posted successfully', 'success');
        // Optionally, refresh the reviews section
      })
      .catch((error) => Swal.fire('Error', error.message, 'error'));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label className="label">Reviewer Name</label>
        <input type="text" value={user.displayName} className="input input-bordered w-full" readOnly />
      </div>
      <div className="form-control">
        <label className="label">Reviewer Image</label>
        <input type="text" value={user.photoURL} className="input input-bordered w-full" readOnly />
      </div>
      <div className="form-control">
        <label className="label">Review Description</label>
        <textarea name="description" className="textarea textarea-bordered w-full" required></textarea>
      </div>
      <div className="form-control">
        <label className="label">Rating</label>
        <input type="number" name="rating" className="input input-bordered w-full" min="1" max="5" required />
      </div>
      <div className="form-control">
        <button type="submit" className="btn btn-primary w-full">Submit</button>
      </div>
    </form>
  );
};

export default PostReview;
