import React from 'react';
import Carousel from './Carousel';
import AddProduct from '../pages/AddProduct';

const Home = () => {
    return (
        <div>
            <h1>This is Home Page</h1>
            <Carousel></Carousel>
            <AddProduct></AddProduct>
        </div>
    );
};

export default Home;