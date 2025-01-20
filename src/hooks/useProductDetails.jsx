import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useProductDetails = (id) => {
  return useQuery({
    queryKey: ['productDetails', id],
    queryFn: async () => {
      const productResponse = await axios.get(`https://product-hunt-server-two.vercel.app/products/${id}`);
      const reviewsResponse = await axios.get(`https://product-hunt-server-two.vercel.app/products/${id}/reviews`);
      return { ...productResponse.data, reviews: reviewsResponse.data };
    },
    enabled: !!id // Ensure the query runs only if id is defined
  });
};

export default useProductDetails;
