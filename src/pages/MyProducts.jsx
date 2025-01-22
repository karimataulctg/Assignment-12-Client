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
    fetch(`http://localhost:5000/products`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Filter products owned by the logged-in user
          const userProducts = data.filter((product) => product.owner?.email === user.email);
          setProducts(userProducts);
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to fetch products.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: `Failed to load products: ${error.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  }, [user, navigate]);

  const handleDelete = (productId) => {
    fetch(`http://localhost:5000/products/${productId}`, {
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
    <div className="my-products-page min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">My Products</h1>
      <div className="overflow-x-auto w-full max-w-5xl">
        <table className="table w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">Product Name</th>
              <th className="py-2 px-4">Votes</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">{product.votes}</td>
                  <td className="py-2 px-4">{product.status}</td>
                  <td className="py-2 px-4 flex space-x-2">
                    <Link to={`/updateProduct/${product._id}`} className="btn btn-sm btn-primary">
                      Update
                    </Link>
                    <button onClick={() => handleDelete(product._id)} className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-2 px-4">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
