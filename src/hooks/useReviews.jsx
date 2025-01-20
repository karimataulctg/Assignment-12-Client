import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useReviews = (productId) => {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const response = await axios.get(`https://product-hunt-server-two.vercel.app/reviews?productId=${productId}`);
      return response.data;
    }
  });
};

const Reviews = ({ productId }) => {
  const { data: reviews, isLoading } = useReviews(productId);

  if (isLoading) return <p>Loading reviews...</p>;

  return (
    <div className="reviews-grid grid grid-cols-1 md:grid-cols-2 gap-6">
      {reviews.map((review) => (
        <div key={review._id} className="card bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center mb-4">
            <img src={review.reviewerImage} alt={review.reviewerName} className="w-10 h-10 rounded-full mr-2" />
            <h3 className="text-lg font-bold">{review.reviewerName}</h3>
          </div>
          <p className="text-lg mb-2">{review.description}</p>
          <p className="text-yellow-500">Rating: {review.rating}/5</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
