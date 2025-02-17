import React from "react";
import Layout from "../components/Layout";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-5xl font-bold">404</h1>
      {/* <h1 className="text-2xl font-bold">ไม่พบหน้าที่เรียกมา</h1> */}
      <h1 className="text-2xl font-bold">The requested page was not found.</h1>
    </div>
  );
};

export default NotFound;
