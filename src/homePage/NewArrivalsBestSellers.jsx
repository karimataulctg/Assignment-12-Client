import React, { useState, useEffect } from "react";
import axios from "axios";

const NewArrivalsBestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-lg font-semibold mt-6">Loading products...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* New Arrivals */}
      <h2 className="text-3xl font-bold text-center  mb-6">New Arrivals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products
          .filter((product) => product.featured) // Show only featured products
          .map((product) => (
            <div key={product._id} className="bg-white p-4 shadow-lg rounded-lg">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-3" />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description.slice(0, 50)}...</p>
              <a
                href={product.externalLinks}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-blue-600 hover:underline"
              >
                View More
              </a>
            </div>
          ))}
      </div>

      {/* Best Sellers */}
      {/* <h2 className="text-3xl font-bold text-center text-red-700 mt-12 mb-6">Best Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products
          .sort((a, b) => b.votes - a.votes) // Sort by votes (highest first)
          .slice(0, 6) // Limit to top 6 best-selling products
          .map((product) => (
            <div key={product._id} className="bg-white p-4 shadow-lg rounded-lg">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-3" />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description.slice(0, 50)}...</p>
              <a
                href={product.externalLinks}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-red-600 hover:underline"
              >
                View More
              </a>
            </div>
          ))}
      </div> */}
    </div>
  );
};

export default NewArrivalsBestSellers;
