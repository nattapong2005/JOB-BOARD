import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";


const Layout = ({ children }) => {

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