import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../AuthProvider';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.email) {
      navigate('/login');
      return;
    }

    // Fetch all products
    fetch(`https://product-hunt-server-two.vercel.app/products`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      credentials: "include",
    })
      .then(async (res) => {
        const text = await res.text(); // Read response as text
        try {
          return JSON.parse(text); // Attempt to parse as JSON
        } catch {
          throw new Error("Invalid JSON response from server: " + text);
        }
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const userProducts = data.filter((product) => product.owner?.email === user.email);
          setProducts(userProducts);
        } else {
          throw new Error("Unexpected response format.");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        Swal.fire({
          title: "Error",
          text: `Failed to load products: ${error.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
    
  }, [user, navigate]);

  const handleDelete = (productId) => {
    fetch(`https://product-hunt-server-two.vercel.app/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire('Deleted', 'Your product has been deleted', 'success');
        setProducts(products.filter((product) => product._id !== productId));
      })
      .catch((error) =>
        Swal.fire('Error', error.message, 'error')
      );
  };

  return (
    <div className="my-products-page min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">My Products</h1>

      {/* Table Wrapper with Scroll for Small Screens */}
      <div className="card overflow-x-auto w-full max-w-5xl">
        <table className="table w-full rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Product Name</th>
              <th className="py-2 px-4 text-left">Votes</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">{product.votes}</td>
                  <td className="py-2 px-4">{product.status}</td>
                  <td className="py-2 px-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                    <Link
                      to={`/updateProduct/${product._id}`}
                      className="btn btn-sm btn-primary text-center"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-sm btn-danger text-center"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 px-4">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;