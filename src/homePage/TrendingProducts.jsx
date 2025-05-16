import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useTrendingProducts from "../hooks/useTrendingProducts";
import { AuthContext } from "../AuthProvider";
import Swal from "sweetalert2";
import { GiSelfLove } from "react-icons/gi";

const TrendingProducts = () => {
  const { data: products, isLoading, error, refetch } = useTrendingProducts();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isLoading) return;
  <div className="flex justify-center items-center">
    <span className="loading loading-dots loading-lg"></span>
  </div>;

  if (error) return <p>Error loading products. Please try again later.</p>;

  const handleUpvote = async (product) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `https://product-hunt-server-two.vercel.app/products/${product._id}/upvote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        }
      );

      const data = await response.json();

      if (data.success) {
        Swal.fire("Upvoted!", "Your vote has been counted.", "success");
        refetch(); // Refetch trending products to update vote count and rearrange products
      } else {
        Swal.fire("Oops!", data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong. Try again later.", "error");
    }
  };

  return (
   <div className="trending-products-section m-6">
  <h2 className="text-center text-2xl font-bold mb-6">Trending Products</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {products && products.length > 0 ? (
      products.map((product) => (
        <div
          key={product._id}
          className="card shadow-md rounded-lg overflow-hidden flex flex-col h-full"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 rounded-t-xl object-cover"
          />
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-2">
              <a
                href={`/product/${product._id}`}
                className="hover:underline"
              >
                {product.name}
              </a>
            </h3>
            <div className="tags mb-4 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="badge badge-secondary">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto">
              <button
                onClick={() => handleUpvote(product)}
                disabled={product.owner.email === user?.email}
                className="btn btn-primary w-full flex items-center justify-center h-12"
              >
                <GiSelfLove className="mr-2" />
                <span className="whitespace-nowrap">{product.votes} Votes</span>
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No trending products available.</p>
    )}
  </div>
</div>
     
  );
};

export default TrendingProducts;
