import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      const response = await axios.get('https://product-hunt-server-two.vercel.app/products?featured=true');
      return response.data;
    }
  });
};

export default useFeaturedProducts;
