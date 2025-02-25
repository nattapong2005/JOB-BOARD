import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import UtilsService from "../services/utils.service";

const JobPost = () => {
  const [role, setRole] = useState("");
  const [jobPosts, setJobPosts] = useState([]);
  const [error, setError] = useState("");



  const fetchJobPost = async () => {
    try {
      const res = await UtilsService.getJobPost();
      // console.log(res.data);
      setJobPosts(res.data);
    } catch (error) {
      setError("เกิดข้อผิดพลาด");
      console.error(error);
    }
  };
  
  const fetchCompanyProfile = async () => {
    try {
      const updatedJobPosts = await Promise.all(
        jobPosts.map(async (job) => {
          if (job.company?.userID) {
            const res = await UtilsService.companyProfile(job.company.userID);
            return { ...job, companyImg: res.data.company.img };
          }
          return job;
        })
      );
      setJobPosts(updatedJobPosts);
    } catch (error) {
      
      setError("เกิดข้อผิดพลาดโปรไฟล์")
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const tokenDecoded = jwtDecode(token);
        setRole(tokenDecoded.role);
      } catch (error) {
        setRole("");
      }
    } else {
      setRole("");
    }
  }, []);

  useEffect(() => {
    fetchJobPost();
  }, []);

  useEffect(() => {
    if (jobPosts.length > 0) {
      fetchCompanyProfile();
    }
  }, [jobPosts]);

  return (
    <Layout>
      <section className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6  pb-4">
          <div>
            <h1 className="font-extrabold text-blue-900">Job Announcements</h1>
            <p className="text-3xl font-bold">ประกาศงาน</p>
          </div>
          {role === "company" && (
            <NavLink 
              to="/createpost" 
              className="px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300 shadow-md"
            >
              + โพสต์งาน
            </NavLink>
          )}
        </div>

        {error && <p className="text-red-500 text-center font-medium">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
          {jobPosts.length > 0 ? (
            jobPosts.map((job, index) => (
              <div
                key={job.id || index}
                className="p-6 bg-white shadow-sm rounded-md border border-gray-200 hover:shadow-md transition duration-300"
              >
                <div className="flex items-center mb-2 ms-1">
                  {job.companyImg ? (
                    <img
                      className="w-10 h-10 rounded-lg"
                      src={`http://localhost:9999/img/${job.companyImg}`}
                      alt="Company Logo"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
                  )}
                  <div>
                    <h2 className="text-xl font-semibold ms-3">{job.title}</h2>
                    <p className="ms-3">{job.company?.name || "ไม่ระบุบริษัท"}</p>
                  </div>
                </div>

                <span className="inline-block bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-md">
                  {job.jobtype?.name || "ไม่ระบุประเภทงาน"}
                </span>
                <p className="text-gray-700 mt-2 line-clamp-3 h-[72px] overflow-hidden flex-grow ms-2">{job.description}</p>
                <hr className="mb-2 mt-2" />
                <div className="flex justify-between items-center mt-5">
                  <p className="ms-2 text-gray-700"><span className="font-bold">{job.salary}</span> บาท</p>
                  <p className="text-gray-700">
                  <span>โพสวันที่ </span> 
                  {new Date(job.posted_at).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "Asia/Bangkok"
                  })}
                </p>
                </div>
                <NavLink
                  to={`/post/${job.id}`}
                  className="mt-4 inline-block w-full text-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
                >
                  <i className="fa-regular fa-folder-open"></i> สมัครงานนี้
                </NavLink>
              </div>
            ))
          ) : (
            <p className="text-center font-bold text-xl text-gray-500 col-span-full">
              ไม่พบประกาศงาน
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default JobPost;
