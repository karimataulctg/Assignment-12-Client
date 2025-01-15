import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5000/products?featured=true');
      return response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
  });
};

export default useFeaturedProducts;
