import React from 'react';
import FeaturedProducts from '../homePage/FeaturedProducts';
import TrendingProducts from '../homePage/TrendingProducts';
import Banner from './Banner';
import AboutUs from './AboutUs';
import FAQ from './FAQ';
import HomePage from '../homePage/HomePage';
import MembershipForm from '../homePage/MembershipForm';
import NewArrivalsBestSellers from '../homePage/NewArrivalsBestSellers';


const Home = () => {
    return (
        <div>
          
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
            <NewArrivalsBestSellers></NewArrivalsBestSellers>
            <HomePage></HomePage>
            <MembershipForm></MembershipForm>
            <AboutUs></AboutUs>
            <FAQ></FAQ>
            
            
            
        </div>
    );
};

export default Home;