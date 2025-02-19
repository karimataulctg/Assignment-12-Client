import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const MembershipForm = () => {
  const [membershipType, setMembershipType] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);

  const handleMembershipChange = (e) => {
    const selectedType = e.target.value;
    setMembershipType(selectedType);
    const prices = { basic: 100, premium: 200, elite: 300 };
    setFinalPrice(prices[selectedType] || 0);
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim() === '') {
      Swal.fire('Error', 'Please enter a valid coupon code', 'error');
      return;
    }

    axios.post('http://localhost:5000/apply-coupon', { couponCode, membershipType })
      .then((response) => {
        const { discountAmount } = response.data;
        const prices = { basic: 100, premium: 200, elite: 300 };
        const originalPrice = prices[membershipType];
        const discountedPrice = originalPrice - (originalPrice * (discountAmount / 100));
        setFinalPrice(discountedPrice);
        Swal.fire('Success', `Coupon applied! You get a ${discountAmount}% discount.`, 'success');
      })
      .catch((error) => {
        Swal.fire('Error', error.response?.data?.message || 'Failed to apply coupon', 'error');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit membership purchase logic here
    Swal.fire('Success', 'Membership purchased successfully', 'success');
  };

  return (
  <div className='my-2 py-6 '>
      <form onSubmit={handleSubmit} className="card membership-form w-full py-4 max-w-3xl mx-auto flex flex-col justify-center items-center space-y-4 p-6  shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Purchase Membership</h2>
      <div className="form-control w-full">
        <label className="label">Membership Type</label>
        <select value={membershipType} onChange={handleMembershipChange} className="select select-bordered w-full" required>
          <option value="">Select Membership Type</option>
          <option value="basic">Basic - $100</option>
          <option value="premium">Premium - $200</option>
          <option value="elite">Elite - $300</option>
        </select>
      </div>
      <div className="form-control w-full">
        <label className="label">Coupon Code</label>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="input input-bordered w-full"
        />
        <button type="button" onClick={handleApplyCoupon} className="btn btn-primary w-full mt-2">Apply Coupon</button>
      </div>
      {finalPrice > 0 && (
        <div className="form-control w-full">
          <label className="label">Final Price</label>
          <input
            type="text"
            value={`$${finalPrice}`}
            className="input input-bordered w-full"
            readOnly
          />
        </div>
      )}
      <button type="submit" className="btn btn-primary w-full">Purchase Membership</button>
    </form>
  </div>
  );
};

export default MembershipForm;
