import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProducts = async (searchTag) => {
  console.log("📢 Fetching products with tag:", searchTag);

  try {
    const { data } = await axios.get(`http://localhost:5000/products`, {
      params: searchTag ? { tag: searchTag.trim() } : {}  // Trim whitespace
    });

    console.log("✅ Fetched products:", data);
    return data;
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
};

const useAllProducts = (searchTag) => {
  return useQuery({
    queryKey: ['products', searchTag], 
    queryFn: () => fetchProducts(searchTag),
    enabled: true, 
  });
};

export default useAllProducts;
