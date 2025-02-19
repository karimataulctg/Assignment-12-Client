import React from 'react';
import HuntImage from '../assets/HuntTeam.webp';

const AboutUs = () => {
  return (
    <div className="card about-us-page flex flex-col items-center justify-center  p-4">
      <div className=" p-8 rounded-lg shadow-md max-w-full w-full text-center">
        <h1 className="text-2xl font-bold mb-6 ">About Us</h1>
        <p className=" mb-4">
          Welcome to Product Hut! We are a team of passionate individuals dedicated to bringing you the best products from around the world. Our mission is to connect innovative creators with enthusiastic consumers.
        </p>
        <p className=" mb-4">
          Whether you are a product creator or a consumer, Product Hut is the place to discover, share, and celebrate the latest and greatest products. Join us on this journey and be a part of our growing community!
        </p>
        <img src={HuntImage} alt="Team Photo" className="mx-auto md:h-64 md:w-9/12 mb-4 rounded-lg shadow-md" />
        {/* <button className="btn btn-primary text-white px-4 py-2 rounded-lg shadow-md">
          Learn More
        </button> */}
      </div>
    </div>
  );
};

export default AboutUs;
