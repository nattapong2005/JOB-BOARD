import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";


const Layout = ({ children }) => {

  const navigate = useNavigate(); 

  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.clear();
      setAuth(false);
      navigate('/login');
    }
  }
  const [isAuth, setAuth] = useState(!!localStorage.getItem("token"));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuth={isAuth}  setAuth={setAuth} />
      <div className="flex-grow">
        {children}
        </div>
      <Footer />
    </div>

    
  );
};

export default Layout;