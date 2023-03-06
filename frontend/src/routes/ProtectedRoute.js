import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { LOGIN_SUCCESS } from '../constants/PageActionTypes';

const ProtectedRoute = ({children}) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch()

    let location = useLocation();

    const token = localStorage.getItem("user_token")
    
    var decodedJWT = undefined
    if(token) {
        decodedJWT = JSON.parse(window?.atob(token?.split(".")[1]))
    }
    
    // Auto login user if token is not expired
    if(!user.isAuthenticated && ( (decodedJWT?.exp*1000) > Date.now()) && decodedJWT) {
        let {userId, email: userEmail, role: userRole} = decodedJWT
        dispatch({type: LOGIN_SUCCESS, payload: {
            userId,
            userEmail,
            userRole,
            isAuthenticated: true,
            error: false,
            errorMessage: "LoggedIn Successfully !!!"
        }})
    }
    

    if((!user?.isAuthenticated && !token) || ((decodedJWT?.exp*1000) < Date.now())) {
        
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children

};



export default ProtectedRoute;