import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useTrendingProducts = () => {
  return useQuery({
    queryKey: ['trendingProducts'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5000/products');
      return response.data.sort((a, b) => b.votes - a.votes).slice(0, 6);
    }
  });
};

export default useTrendingProducts;
