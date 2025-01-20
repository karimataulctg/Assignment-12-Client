import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const ModeratorDashboard = () => {
  const [products, setProducts] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('user')) || null;

  useEffect(() => {
    if (!loggedInUser || loggedInUser.role !== 'moderator') {
      Swal.fire('Error', 'Unauthorized access', 'error');
      window.location.href = '/'; // Redirect to home if not moderator
      return;
    }

    fetch('http://localhost:5000/products', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => Swal.fire('Error', error.message, 'error'));
  }, [loggedInUser]);

  const handleStatusChange = (productId, status) => {
    fetch(`http://localhost:5000/products/${productId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, moderatorEmail: loggedInUser.email }),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire('Updated', `Product status updated to ${status}.`, 'success');
        setProducts(products.map((product) => (product._id === productId ? { ...product, status } : product)));
      })
      .catch((error) => Swal.fire('Error', error.message, 'error'));
  };

  return (
    <div className="moderator-page min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Moderator Dashboard</h1>
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
                    <button onClick={() => handleStatusChange(product._id, 'Accepted')} className="btn btn-sm btn-success">
                      Accept
                    </button>
                    <button onClick={() => handleStatusChange(product._id, 'Rejected')} className="btn btn-sm btn-warning">
                      Reject
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

export default ModeratorDashboard;
