import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/coupons/valid")
      .then((response) => {
        setCoupons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching valid coupons:", error);
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
    centerMode: false,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <div className="card p-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6 text-center">Coupon Codes</h1>
      <div className="w-full max-w-2xl">
        {coupons.length > 0 ? (
          <Slider {...settings}>
            {coupons.map((coupon, index) => (
              <div key={index} className="p-4">
                <div className="bg-gradient-to-r from-gray-800 via-blue-700 to-gray-800 shadow-xl text-white p-6 rounded-lg">
                  <h2 className="text-2xl font-bold">{coupon.code}</h2>
                  <p>Expiry Date: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
                  <p>{coupon.description}</p>
                  <p className="text-lg font-semibold">
                    Discount Amount: {coupon.discountAmount}%
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-gray-600 text-center">No coupons available.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
