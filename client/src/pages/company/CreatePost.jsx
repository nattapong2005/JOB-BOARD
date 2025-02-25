import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./../../components/Layout";
import UtilsService from "../../services/utils.service";

const CreatePost = () => {

  const navigate = useNavigate();
  const [jobtype, setJobType] = useState([]);

  const [error, setError] = useState("");
  const token = localStorage.getItem('token');
  // const userID = jwtDecode(token).userID;

  const fetchYourCompany = async () => {
    await UtilsService.profile(token).then((res) => {
      // console.log(res.data.user.company.name)
      setFormData({
        ...formData,
        companyID: res.data.user.company.id
      })
    })
  }
  const fetchJobType = async () => {
    await UtilsService.jobtype()
      .then((res) => {
        setJobType(res.data);
      })
      .catch((err) => {
        console.error("Error fetching job types:", err);
        setError("ไม่สามารถโหลดประเภทงานได้");
      });
  };

  useEffect(() => {
    fetchJobType();
    fetchYourCompany();
  }, []);

  const [formData, setFormData] = useState({
    companyID: "",
    title: "",
    description: "",
    requirement: "",
    salary: 0,
    location: "",
    jobtypeID: 0, 
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleJobTypeChange = (e) => {
    setFormData({ ...formData, jobtypeID: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      UtilsService.jobpost(token,formData).then((res) => {
        alert("สร้างโพสต์เสร็จสิ้น");
        navigate("/post"); 
      })
    } catch (error) {
      console.error(error);
      setError("เกิดข้อผิดพลาดในการสร้างโพสต์");
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6 py-16 mt-5 mb-10">
        <h2 className="text-4xl font-semibold text-center text-gray-700 mb-4">
          สร้างโพสต์งาน
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            placeholder="หัวข้องาน ..."
            onChange={handleChange}
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            rows={6}
            name="description"
            placeholder="รายละเอียดงาน ..."
            onChange={handleChange}
            className="p-3  border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="requirement"
            placeholder="ความต้องการของงาน ..."
            onChange={handleChange}
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="salary"
            placeholder="เงินเดือน"
            onChange={handleChange}
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="สถานที่"
            onChange={handleChange}
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Job Type Dropdown */}
          <select
            name="jobtypeID"
            value={formData.jobType}
            onChange={handleJobTypeChange}
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">เลือกประเภทงาน</option>
            {jobtype.map((jt) => (
              <option key={jt.id} value={jt.id}>
                {jt.type}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all w-full lg:col-span-2"
          >
            สร้างโพสต์
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePost;
