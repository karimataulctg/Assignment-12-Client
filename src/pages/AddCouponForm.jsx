import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddCouponForm = () => {
  const [code, setCode] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [description, setDescription] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCoupon = {
      code,
      expiryDate,
      description,
      discountAmount: parseFloat(discountAmount),
    };

    axios.post('http://localhost:5000/coupons', newCoupon)
      .then((response) => {
        Swal.fire('Success', response.data.message, 'success');
        // Reset form fields
        setCode('');
        setExpiryDate('');
        setDescription('');
        setDiscountAmount('');
      })
      .catch((error) => {
        Swal.fire('Error', error.response?.data?.message || 'Failed to add coupon', 'error');
        console.error('Error adding coupon:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="card add-coupon-form space-y-4 p-6 shadow-md rounded-lg w-full max-w-xl mx-auto my-6">
      <h2 className="text-2xl font-bold mb-4">Add Coupon</h2>
      <div className="form-control">
        <label className="label">Coupon Code</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="form-control">
        <label className="label">Expiry Date</label>
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="form-control">
        <label className="label">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full"
          required
        ></textarea>
      </div>
      <div className="form-control">
        <label className="label">Discount Amount</label>
        <input
          type="number"
          value={discountAmount}
          onChange={(e) => setDiscountAmount(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">Add Coupon</button>
    </form>
  );
};

export default AddCouponForm;
