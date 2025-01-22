import React from "react";
import banner from "../assets/Banner.png";
import buttonImg from "../assets/Button_02.png";
import { useNavigate } from "react-router-dom";
import { Parallax } from 'react-parallax';

const Banner = () => {
    const navigate = useNavigate();
    return (
        <Parallax bgImage={banner} strength={500} className="relative w-full md:h-96 flex items-center justify-center overflow-hidden">
            <div className="relative text-center px-2">
              <h1 className="text-3xl font-bold text-white">Product Hunt</h1>
              <h1 className="text-1xl font-bold text-slate-300 ">" Where Tech Creators and Enthusiasts Converge"</h1>
                <h1 className="text-white text-sm md:text-xl lg:text-1xl font-semibold">
                    Welcome to our vibrant tech community where innovation meets inspiration. 
                    Whether you're a creator eager to showcase your latest product, or a tech 
                    enthusiast looking to explore cutting-edge developments, we've got you covered. 
                    For Tech Pioneers: Submit your groundbreaking products and watch as they gain traction. 
                    Our platform connects you with a passionate audience ready to upvote, review, and 
                    celebrate your innovations. For Enthusiasts: Stay ahead of the curve by browsing the 
                    latest tech products. Upvote your favorites, leave insightful reviews, and be a part 
                    of the buzz that shapes the future of technology.
                </h1>
                <img
                    src={buttonImg}
                    alt="Submit Product Button"
                    className="btn btn-circle mt-4 w-24 h-24 mb-4 
                    rounded-full transition duration-500 ease-in-out transform hover:scale-110"
                    onClick={() => {
                        navigate("/allProducts");
                    }}
                />
            </div>
        </Parallax>
    );
};

export default Banner;
