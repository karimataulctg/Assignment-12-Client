import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProductReviewQueue = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all products
    axios.get('http://localhost:5000')
      .then((response) => {
        const sortedProducts = response.data.sort((a, b) => {
          if (a.status === 'Pending' && b.status !== 'Pending') return -1;
          if (a.status !== 'Pending' && b.status === 'Pending') return 1;
          return 0;
        });
        setProducts(sortedProducts);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleViewDetails = (productId) => {
    navigate(`/productDetails/${productId}`);
  };

  const handleMakeFeatured = (productId) => {
    axios.put(`https://product-hunt-server-two.vercel.app/${productId}/feature`)
      .then(() => {
        Swal.fire('Success', 'Product marked as featured.', 'success');
        setProducts((prevProducts) => prevProducts.map((product) =>
          product._id === productId ? { ...product, featured: true } : product
        ));
      })
      .catch((error) => {
        console.error('Error marking product as featured:', error);
      });
  };

  const handleAccept = (productId) => {
    axios.put(`https://product-hunt-server-two.vercel.app/${productId}/status`, { status: 'Accepted' })
      .then(() => {
        Swal.fire('Success', 'Product accepted.', 'success');
        setProducts((prevProducts) => prevProducts.map((product) =>
          product._id === productId ? { ...product, status: 'Accepted' } : product
        ));
      })
      .catch((error) => {
        console.error('Error accepting product:', error);
      });
  };

  const handleReject = (productId) => {
    axios.put(`https://product-hunt-server-two.vercel.app/${productId}/status`, { status: 'Rejected' })
      .then(() => {
        Swal.fire('Success', 'Product rejected.', 'success');
        setProducts((prevProducts) => prevProducts.map((product) =>
          product._id === productId ? { ...product, status: 'Rejected' } : product
        ));
      })
      .catch((error) => {
        console.error('Error rejecting product:', error);
      });
  };

  return (
    <div className="product-review-queue min-h-screen p-6 ">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Review Queue</h1>
      <div className="card overflow-x-auto">
        <table className="table-auto w-full shadow-md rounded-lg">
          <thead>
            <tr className="">
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleViewDetails(product._id)}
                    className="btn btn-sm btn-info"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleMakeFeatured(product._id)}
                    className="btn btn-sm btn-warning"
                    disabled={product.featured}
                  >
                    Make Featured
                  </button>
                  <button
                    onClick={() => handleAccept(product._id)}
                    className="btn btn-sm btn-success"
                    disabled={product.status === 'Accepted'}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(product._id)}
                    className="btn btn-sm btn-danger"
                    disabled={product.status === 'Rejected'}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductReviewQueue;
