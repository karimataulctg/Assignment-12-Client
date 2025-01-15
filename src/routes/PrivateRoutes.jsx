import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <progress className="progress w-56"></progress>;
    }

   // If user is authenticated, render children components, otherwise, redirect to login page.  //done
    
   if (user) {
     return children;
   }
    return <Navigate to={"/login"} state={{from: location}} replace></Navigate>
};

export default PrivateRoutes;