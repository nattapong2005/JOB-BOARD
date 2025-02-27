import React, { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";


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
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex  min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} isAuth={isAuth} setAuth={setAuth} />
      <div className="flex-grow p-5">
        {children}
        </div>
      {/* <Footer /> */}
    </div>

    
  );
};

export default Layout;