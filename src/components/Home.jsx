import React from 'react';
import Carousel from './Carousel';
import FeaturedProducts from '../homePage/FeaturedProducts';
import TrendingProducts from '../homePage/TrendingProducts';
import ProductDetails from '../homePage/ProductDetails';

const Home = () => {
    return (
        <div>
            <h1>This is Home Page</h1>
            <Carousel></Carousel>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
            <ProductDetails></ProductDetails>
            
            
        </div>
    );
};

export default Home;