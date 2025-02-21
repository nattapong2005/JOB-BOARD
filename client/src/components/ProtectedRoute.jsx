import React from 'react'
import { Navigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'

const ProtectedRoute = ({children}) => {

    const token = localStorage.getItem('token');

    if(token) {
        try {
            const decodeToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if(decodeToken.exp > currentTime) {
                return children;
            }else {
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.log('Invalid token');
        }
    }
  return (
    <Navigate to="/login" />
  )
}

export default ProtectedRoute;