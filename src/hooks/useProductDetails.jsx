import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useProductDetails = (productId) => {
  return useQuery({
    queryKey: ['productDetails', productId],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5000/products/${productId}`);
      return response.data;
    }
  });
};

export default useProductDetails;
