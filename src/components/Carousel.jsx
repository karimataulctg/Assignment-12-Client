import React from "react";
import { Link } from "react-router-dom";

const Carousel = () => {
  return (
    <div className="carousel w-full h-96 bg-gray-800 text-white">
      <div id="slide1" className="carousel-item relative w-full">
        <div className="w-full flex items-center justify-center bg-blue-500">
          <h2 className="text-3xl font-bold">Welcome to Slide 1</h2>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <Link to="#slide3" className="btn btn-circle">
            ❮
          </Link>
          <Link to="#slide2" className="btn btn-circle">
            ❯
          </Link>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <div className="w-full flex items-center justify-center bg-green-500">
          <h2 className="text-3xl font-bold">Welcome to Slide 2</h2>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <Link to="#slide1" className="btn btn-circle">
            ❮
          </Link>
          <Link to="#slide3" className="btn btn-circle">
            ❯
          </Link>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <div className="w-full flex items-center justify-center bg-red-500">
          <h2 className="text-3xl font-bold">Welcome to Slide 3</h2>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <Link to="#slide2" className="btn btn-circle">
            ❮
          </Link>
          <Link to="#slide1" className="btn btn-circle">
            ❯
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
