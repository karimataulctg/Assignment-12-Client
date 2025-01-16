import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useAllProducts = () => {
  return useQuery({
    queryKey: ['allProducts'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5000/products');
      return response.data;
    }
  });
};

export default useAllProducts;
