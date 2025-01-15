// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchFeaturedProducts } from "./mockAPI";

// const FeaturedProducts = ({ currentUser }) => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const data = fetchFeaturedProducts();
//     setProducts(data.sort((a, b) => b.timestamp - a.timestamp)); // Sort by timestamp
//   }, []);

//   const handleUpvote = (productId) => {
//     if (!currentUser) {
//       navigate("/login");
//       return;
//     }

//     setProducts((prev) =>
//       prev.map((product) =>
//         product.id === productId && product.owner !== currentUser
//           ? { ...product, votes: product.votes + 1 }
//           : product
//       )
//     );
//   };

//   return (
//     <div className="p-6 bg-gray-100">
//       <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <div key={product.id} className="card bg-white shadow-md p-4">
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-48 object-cover rounded"
//             />
//             <h3
//               className="text-xl font-bold cursor-pointer mt-2"
//               onClick={() => navigate(`/product/${product.id}`)}
//             >
//               {product.name}
//             </h3>
//             <p className="text-sm text-gray-500">
//               Tags: {product.tags.join(", ")}
//             </p>
//             <button
//               className={`btn btn-sm mt-4 ${
//                 product.owner === currentUser ? "btn-disabled" : ""
//               }`}
//               onClick={() => handleUpvote(product.id)}
//               disabled={product.owner === currentUser}
//             >
//               👍 {product.votes}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeaturedProducts;
