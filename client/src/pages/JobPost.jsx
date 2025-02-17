import React from "react";
import Layout from "../components/Layout";

const JobPost = () => {
  return (
    <Layout>
      {/* Main  */}
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-blue-900 font-bold">Job Announcement</h1>
        <h2 className="text-3xl font-bold mb-6">ประกาศงาน</h2>

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
