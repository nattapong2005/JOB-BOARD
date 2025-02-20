import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    lastname: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // const res = await axios.post("http://localhost:9999/signup", formData);
      const res = await AuthService.register(formData);
      navigate("/login");
      
      console.log(res);
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการลงทะเบียน");
    }
  };

  return (
    <section className="container mx-auto">
      <div className="flex justify-center items-center h-screen ">
        <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-6 md:p-12">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between">
            <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-6">
              <h1 className="text-4xl font-bold mb-2">ลงทะเบียน</h1>
              {error && (
                <p className="text-slate-50 p-3 rounded-xl mb-4 bg-red-500">
                  {error}
                </p>
              )}
              <NavLink to={"/login"} className="mb-4 text-gray-600">
                หากคุณมีบัญชีอยู่แล้ว{" "}
                <span className="text-blue-900 cursor-pointer">
                  เข้าสู่ระบบที่นี่
                </span>
              </NavLink>
              <form onSubmit={handleSubmit}>
                <div className="flex gap-10">
                  {/* Firstname */}
                  <div className="mb-4">
                    <label
                      className="block text-sm text-gray-700"
                      htmlFor="username"
                    >
                      ชื่อ
                    </label>
                    <input
                      type="text"
                      placeholder="Firstname"
                      className="mt-2 w-full px-4 py-2 border-b-2 border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      name="name"
                      onChange={handleChange}
                      value={formData.name}
                      required
                    />
                  </div>

                  {/* Lastname */}
                  <div className="mb-4">
                    <label
                      className="block text-sm text-gray-700"
                      htmlFor="username"
                    >
                      นามสกุล
                    </label>
                    <input
                      type="text"
                      placeholder="Lastname"
                      className="mt-2 w-full px-4 py-2 border-b-2 border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      name="lastname"
                      onChange={handleChange}
                      value={formData.lastname}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-10">
                  {/* Username */}
                  <div className="mb-4">
                    <label
                      className="block text-sm text-gray-700"
                      htmlFor="username"
                    >
                      ชื่อผู้ใช้งาน
                    </label>
                    <input
                      type="text"
                      placeholder="Username"
                      className="mt-2 w-full px-4 py-2 border-b-2 border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      name="username"
                      onChange={handleChange}
                      value={formData.username}
                      required
                    />
                  </div>

                  {/*Password*/}
                  <div className="mb-4">
                    <label
                      className="block text-sm text-gray-700"
                      htmlFor="password"
                    >
                      รหัสผ่าน
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      className="mt-2 w-full px-4 py-2 border-b-2 border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-10">
                  {/* Phone */}
                  <div className="mb-4">
                    <label
                      className="block text-sm text-gray-700"
                      htmlFor="email"
                    >
                      เบอร์โทรศัพท์
                    </label>
                    <input
                      type="text"
                      placeholder="Phone"
                      className="mt-2 w-full px-4 py-2 border-b-2 border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      name="phone"
                      onChange={handleChange}
                      value={formData.phone}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label
                      className="block text-sm text-gray-700"
                      htmlFor="email"
                    >
                      อีเมล
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="mt-2 w-full px-4 py-2 border-b-2 border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-blue-900 text-white rounded-md shadow-md hover:bg-blue-600 transition mb-4"
                >
                  ลงทะเบียน
                </button>
              </form>
              <div className="text-center">
                <p className="text-gray-500 mb-3">หรือสมัครด้วย</p>
                <div className="flex justify-center gap-4">
                  <button className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-900 text-white rounded-md shadow-md hover:bg-blue-600 transition">
                    <img
                      src="./icon/google.svg"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-900 text-white rounded-md shadow-md hover:bg-blue-600 transition">
                    <img
                      src="./icon/facebook.svg"
                      alt="Facebook"
                      className="w-5 h-5"
                    />
                    Facebook
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                className="max-w-full h-auto"
                src="./img/register.svg"
                alt="Register illustration"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
