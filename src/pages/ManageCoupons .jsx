import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddCouponForm from './AddCouponForm';

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get('http://localhost:5000/coupons');
      setCoupons(response.data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const handleCouponAdded = (newCoupon) => {
    setCoupons([...coupons, newCoupon]);
  };

  const handleEditCoupon = async (couponId, updatedCoupon) => {
    try {
      await axios.put(`http://localhost:5000/coupons/${couponId}`, updatedCoupon);
      Swal.fire('Coupon Updated', 'Your coupon has been updated successfully', 'success');
      fetchCoupons();
    } catch (error) {
      console.error('Error updating coupon:', error);
    }
  };

  const handleDeleteCoupon = async (couponId) => {
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
        axios.delete(`http://localhost:5000/coupons/${couponId}`)
          .then(() => {
            Swal.fire('Deleted!', 'The coupon has been deleted.', 'success');
            setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon._id !== couponId));
          })
          .catch((error) => {
            console.error('Error deleting coupon:', error);
          });
      }
    });
  };

  return (
    <div className="manage-coupons-page min-h-screen p-6 ">
      <h1 className="text-3xl text-center font-bold mb-6">Manage Coupons</h1>
      
      <AddCouponForm onCouponAdded={handleCouponAdded} />

      <div className="card p-4 rounded shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Coupon List</h2>
        <ul>
          {coupons.map((coupon) => (
            <li key={coupon._id} className="border-b py-2 flex justify-between">
              <span>{coupon.code} - {coupon.discount}%</span>
              <div>
                <button 
                  onClick={() => handleEditCoupon(coupon._id, { ...coupon, discount: coupon.discount + 5 })} 
                  className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteCoupon(coupon._id)} 
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageCoupons;
