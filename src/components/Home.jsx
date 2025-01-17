import React from 'react';
import Carousel from './Carousel';
import FeaturedProducts from '../homePage/FeaturedProducts';
import TrendingProducts from '../homePage/TrendingProducts';
import Banner from './Banner';


const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
            
            
            
        </div>
    );
};

export default Home;