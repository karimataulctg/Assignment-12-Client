import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
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

const router = createBrowserRouter([
  {
    path: "/",
    element:<MainLayout></MainLayout>,
    children: [
      { path: "/", 
        element: <Home></Home> },
      { path: "login",
         element: <Login></Login> },
      { path: "register",
         element: <Register></Register>},
      {path: "*",
         element: <PageNotFound></PageNotFound>},
   
    ]
  },
  {
    path: "dashboard", 
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children: [
      // {
      //   path: 'cart',
      //   element: <Cart></Cart>
      // },
      // {
      //   path: 'allUsers',
      //   element: <AllUsers></AllUsers>
      // },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </StrictMode>,
)
