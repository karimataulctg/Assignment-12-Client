import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './MainLayout.jsx';
import AuthProvider from './AuthProvider.jsx';
import Login from './Login/Login.jsx';
import Register from './Login/Register.jsx';
import Home from './components/Home.jsx';
import PageNotFound from './components/PageNotFound.jsx';
import PrivateRoutes from './routes/PrivateRoutes.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Profile from './pages/Profile.jsx';
import MyProducts from './pages/MyProducts.jsx';
import AddProduct from './pages/AddProduct.jsx';
import ProductDetails from './homePage/ProductDetails.jsx';
import AllProducts from './homePage/AllProducts.jsx';
import UpdateProduct from './pages/UpdateProduct.jsx';
import AdminDashboard from './pages/AdminDashboard .jsx';
import ModeratorDashboard from './pages/ModeratorDashboard .jsx';
import Contact from './components/Contact.jsx';
import AllUsers from './pages/AllUsers.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "login", element: <Login></Login> },
      { path: "register", element: <Register></Register> },
      {path: "/productDetails/:id", element: <ProductDetails></ProductDetails>},
      {path: 'allProducts', element: <AllProducts></AllProducts> },
      {
        path: '/updateProduct/:id',
        element: <UpdateProduct></UpdateProduct>
      },
      {
        path: 'contact',
        element: <Contact></Contact>
      },
      { path: "*", element: <PageNotFound></PageNotFound> },
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children: [
      {
        path: 'addProduct',
        element: <AddProduct></AddProduct>
      },
      {
        path: 'myProducts',
        element: <MyProducts></MyProducts>
      },
     
      {
        path: 'profile',
        element: <Profile></Profile>
      },
      {
        path: 'admin',
        element: <AdminDashboard></AdminDashboard>
      },
      {
        path: 'moderator',
        element: <ModeratorDashboard></ModeratorDashboard>
      },
      {
        path: 'allUsers',
        element: <AllUsers></AllUsers>
      }
    ]
  }
]);

// Create an instance of QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="max-w-7xl mx-auto">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
