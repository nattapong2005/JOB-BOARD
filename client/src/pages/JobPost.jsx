import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const JobPost = () => {

  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const tokenDecoded = jwtDecode(token);
        setRole(tokenDecoded.role);
      } catch (error) {
        setRole('');
      }
    } else {
      setRole('');
    }
  }, []); 
  
  return (
    <Layout>
      {/* Main  */}
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-blue-900 font-bold">Job Announcement</h1>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-3xl font-bold mb-6">ประกาศงาน</h2>

    
   
        {
          role === 'company' ? 
          <NavLink to={"/createpost"} className="px-3 py-1.5 bg-blue-500 text-white rounded-md">โพสต์งาน</NavLink>
          : ''
        }

          {/* <NavLink to={"/createpost"} className="px-3 py-1.5 bg-blue-500 text-white rounded-md">โพสต์งาน</NavLink> */}


        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6 w-full">
          <div className="card p-5 bg-white shadow-md w-full">
             <h1 className="text-xl font-bold">Software Tester</h1> 
             <h1>Job Description ....</h1>
             <button className="px-2 py-1.5 mt-2 bg-blue-500 text-white rounded-md">สมัครงานนี้</button>
          </div>
          <div className="card p-5 bg-white shadow-md w-full">
             <h1 className="text-xl font-bold">Web Developer</h1> 
             <h1>Job Description ....</h1>
             <button className="px-2 py-1.5 mt-2 bg-blue-500 text-white rounded-md">สมัครงานนี้</button>
          </div>
          <div className="card p-5 bg-white shadow-md w-full">
             <h1 className="text-xl font-bold">UI Designer</h1> 
             <h1>Job Description ....</h1>
             <button className="px-2 py-1.5 mt-2 bg-blue-500 text-white rounded-md">สมัครงานนี้</button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default JobPost;
