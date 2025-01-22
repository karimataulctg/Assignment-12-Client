import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const route = location.pathname;
    let title = 'Product Hunt'; // Default title

    // Update title based on route
    switch (route) {
      case '/':
        title = 'Home - Product Hunt';
        break;
      case '/login':
        title = 'Login - Product Hunt';
        break;
      case '/register':
        title = 'Register - Product Hunt';
        break;
      case '/productDetails/:id':
        title = 'Product Details - Product Hunt';
        break;
      case '/allProducts':
        title = 'All Products - Product Hunt';
        break;
      case '/updateProduct/:id':
        title = 'Update Product - Product Hunt';
        break;
      case '/contact':
        title = 'Contact - Product Hunt';
        break;
      case '/dashboard':
        title = 'Dashboard - Product Hunt';
        break;
      case '/dashboard/adminStatistics':
        title = 'Admin - Product Hunt';
        break;
      default:
        if (route.startsWith('/productDetails/')) {
          title = 'Product Details - Product Hunt';
        } else if (route.startsWith('/allProducts/')) {
          title = 'All Products - Product Hunt';
        } else {
          title = 'Page Not Found - Product Hunt';
        }
    }

    document.title = title;
  }, [location]);

  return null;
};

export default DynamicTitle;
