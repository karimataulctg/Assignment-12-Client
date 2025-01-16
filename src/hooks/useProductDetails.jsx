import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useProductDetails = (id) => {
  return useQuery({
    queryKey: ['productDetails', id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      return response.data;
    },
    enabled: !!id // Ensure the query runs only if id is defined
  });
};

export default useProductDetails;

