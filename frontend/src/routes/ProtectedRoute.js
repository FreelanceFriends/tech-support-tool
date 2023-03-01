import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const user = useSelector((state) => state.user);
    console.log(user)
    let location = useLocation();

    const token = localStorage.getItem("user_token")
    console.log(!user?.isAuthenticated,!token)
    if(!user?.isAuthenticated || !token) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;