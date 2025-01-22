import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/coupons/valid')
      .then((response) => {
        setCoupons(response.data);
      })
      .catch((error) => {
        console.error('Error fetching valid coupons:', error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: '0',
  };

  return (
    <div className="homepage  p-6 bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Coupon Codes</h1>
      <div className="w-full max-w-2xl ">
        <Slider {...settings}>
          {coupons.map((coupon, index) => (
            <div key={index} className="carousel-item p-4">
              <div className="card  w-full bg-gradient-to-r from-gray-800 via-blue-700 to-gray-800 shadow-xl text-white">
                <div className="card-body">
                  <h2 className="card-title">{coupon.code}</h2>
                  <p className="text-gray-100">Expiry Date: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
                  <p>{coupon.description}</p>
                  <p className="text-lg font-semibold">Discount Amount: {coupon.discountAmount}%</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomePage;
