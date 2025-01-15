import React from 'react';
import errorPageImage from '../assets/404_page-not-found.png'

const PageNotFound = () => {
    return (
        <div className='flex items-center justify-center '>
            <img className='h-96' src={errorPageImage} alt="" />
        </div>
    );
};

export default PageNotFound;