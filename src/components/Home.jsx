import React from 'react';
import Carousel from './Carousel';
import FeaturedProducts from '../homePage/FeaturedProducts';
import TrendingProducts from '../homePage/TrendingProducts';


const Home = () => {
    return (
        <div>
            
            <Carousel></Carousel>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
            
            
            
        </div>
    );
};

export default Home;