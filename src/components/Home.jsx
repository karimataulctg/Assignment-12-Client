import React from 'react';
import FeaturedProducts from '../homePage/FeaturedProducts';
import TrendingProducts from '../homePage/TrendingProducts';
import Banner from './Banner';
import AboutUs from './AboutUs';
import FAQ from './FAQ';


const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
            <AboutUs></AboutUs>
            <FAQ></FAQ>
            
            
            
        </div>
    );
};

export default Home;