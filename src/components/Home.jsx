import React from 'react';
import Carousel from './Carousel';
import AddProduct from '../pages/AddProduct';
import MyProducts from '../pages/MyProducts';
import Profile from '../pages/Profile';

const Home = () => {
    return (
        <div>
            <h1>This is Home Page</h1>
            <Carousel></Carousel>
            <AddProduct></AddProduct>
            <MyProducts></MyProducts>
            <Profile></Profile>
            
        </div>
    );
};

export default Home;