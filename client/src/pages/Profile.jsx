import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import UtilsService from "../services/utils.service";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "./../helpers/sweetalert";

const Profile = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const token = localStorage.getItem("token");
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    img: "",
    password: "",
    confirmPassword: "",
  });

  const fetchProfile = async (token) => {
    const res = await UtilsService.profile(token);
    setFormData(res.data.user);
  };

  const handleChange = (e) => {
    if (e.target.name === "img") {
      const file = e.target.files[0];
      if (file) {
        setPreviewImage(URL.createObjectURL(file)); // แสดง Preview
        setFile(file);
        setFormData({ ...formData, img: URL.createObjectURL(file) });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showError("รหัสผ่านไม่ตรงกัน", "");
      return;
    }
    try {
      if (file && file.name) {
        const formDataImg = new FormData();
        formDataImg.append("img", file);
        await UtilsService.updateProfile(token, formDataImg);
      }
      await UtilsService.updateProfile(token, formData);
      showSuccess("อัพเดตโปรไฟล์เรียบร้อย", "/");
    } catch (error) {
      showError("เกิดข้อผิดพลาดการอัพเดท", "/");
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile(token);
    }
  }, []);

  return (
    <Layout>
      <section className="flex justify-center  p-5 mb-5">
        <div className="card shadow-lg w-full max-w-6xl p-6 bg-white rounded-lg">
          <h1 className="text-center font-bold text-3xl mb-5">โปรไฟล์ของคุณ</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center">
              <img
                className="w-44 h-44 rounded-full object-cover border-2 border-gray-300"
                src={previewImage || `http://localhost:9999/img/${formData.img}`}
                alt="Profile"
              />
              <label className="mt-3 cursor-pointer bg-gray-100 text-gray-700 text-sm rounded-lg px-4 py-2 border border-gray-300 hover:bg-gray-200">
                <i className="fa-solid fa-upload"></i> เปลี่ยนรูปโปรไฟล์
                <input type="file" name="img" className="hidden" onChange={handleChange} />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="input-group">
                <label htmlFor="name">ชื่อ</label>
                <input
                  value={formData.name || ""}
                  onChange={handleChange}
                  type="text"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="name"
                />
              </div>
              <div className="input-group">
                <label htmlFor="lastname">นามสกุล</label>
                <input
                  value={formData.lastname || ""}
                  onChange={handleChange}
                  type="text"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="lastname"
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">อีเมล</label>
                <input
                  value={formData.email || ""}
                  onChange={handleChange}
                  type="text"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="email"
                />
              </div>
              <div className="input-group">
                <label htmlFor="phone">เบอร์โทร</label>
                <input
                  value={formData.phone || ""}
                  onChange={handleChange}
                  type="text"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="phone"
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">รหัสผ่าน</label>
                <input
                  value={formData.password || ""}
                  onChange={handleChange}
                  type="password"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="password"
                />
              </div>
              <div className="input-group">
                <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</label>
                <input
                  value={formData.confirmPassword || ""}
                  onChange={handleChange}
                  type="password"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="confirmPassword"
                />
              </div>
            </div>
            <button
              className="w-full mt-3 bg-blue-500 p-3 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-600 transition-all duration-200"
              type="submit"
            >
              <i class="fa-solid fa-floppy-disk"></i> บันทึกข้อมูล
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
