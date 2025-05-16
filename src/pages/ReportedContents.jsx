import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ReportedContents = () => {
  const [reportedProducts, setReportedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch reported products
    axios.get('http://localhost:5000/reported-products')
      .then((response) => {
        setReportedProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reported products:', error);
      });
  }, []);

  const handleViewDetails = (productId) => {
    navigate(`/productDetails/${productId}`);
  };

  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/${productId}`)
          .then(() => {
            Swal.fire('Deleted!', 'The product has been deleted.', 'success');
            setReportedProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
          })
          .catch((error) => {
            console.error('Error deleting product:', error);
          });
      }
    });
  };

  return (
    <div className="reported-contents min-h-screen p-6 ">
      <h1 className="text-3xl font-bold mb-6 text-center">Reported Contents</h1>
      <div className="card overflow-x-auto">
        <table className="table-auto w-full shadow-md rounded-lg">
          <thead>
            <tr className="">
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportedProducts.map((product) => (
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
                    onClick={() => handleDeleteProduct(product._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {reportedProducts.length === 0 && (
              <tr>
                <td colSpan="2" className="px-4 py-2 text-center text-red-500">
                  No reported products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedContents;
