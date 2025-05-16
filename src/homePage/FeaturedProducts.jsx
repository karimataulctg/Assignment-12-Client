import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { GiSelfLove } from "react-icons/gi";
import Swal from "sweetalert2";

const fetchProducts = async () => {
  const { data } = await axios.get("http://localhost:5000/products");
  return data.slice(-8).reverse();
};

const FeaturedProducts = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    data: products,
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const handleUpvote = (product) => {
    if (!user) {
      navigate("/login"); // Redirect to login if not logged in
      return;
    }

    axios
      .post(`http://localhost:5000/products/${product._id}/upvote`, {
        email: user.email,
      })
      .then((response) => {
        if (response.data.success) {
          Swal.fire("Upvoted!", "Your vote has been counted.", "success");
          refetch(); // Refetch the products after upvoting
        } else {
          Swal.fire("Error", response.data.message, "error");
        }
      })
      .catch((error) => {
        Swal.fire(
          "Error",
          error.response?.data?.message || error.message,
          "error"
        );
      });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  if (isError) return <p>Error loading products</p>;

  return (
    <>
  <h2 className="text-center text-2xl font-bold mt-4 mb-2">
    Featured Products
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-6">
    {products.length > 0 ? (
      products.map((product) => (
        <div
          key={product._id}
          className="card shadow-md rounded-lg overflow-hidden flex flex-col"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 rounded-t-xl object-cover"
          />
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-2">
              <a
                href={`/productDetails/${product._id}`}
                className="hover:underline"
              >
                {product.name}
              </a>
            </h3>
            <div className="mb-4 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="badge badge-secondary">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto">
              <button
                onClick={() => handleUpvote(product)}
                disabled={
                  (product.upvotedBy || []).includes(user?.email) ||
                  product.owner === user?.email
                }
                className="btn btn-primary w-full flex items-center justify-center 
                  disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-black
                  h-12" // Added fixed height
              >
                <GiSelfLove className="mr-2" />
                <span className="whitespace-nowrap">{product.votes} Votes</span>
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No featured products available.</p>
    )}
  </div>
</>
  );
};

export default FeaturedProducts;
