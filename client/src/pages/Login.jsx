import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Login = ({setAuth}) => {

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ 
      ...formData,
       [e.target.name]: e.target.value });

  };

  const handleSubmit = async (e) => { 
    e.preventDefault();

    try {

      // const res = await axios.post("http://localhost:9999/login", formData);
      const res = await AuthService.login(formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.payload.role);
      setAuth(true);
      redirect(res.data.payload.role);

      
    }catch (error) {
      console.log(error);
      setError('ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง');
    }
  }

  const redirect = (role) => {
    if(role == "admin") {
      navigate("/admin");
    }else {
      navigate("/");
    }
  }

  return (
    <section className="container mx-auto">
      <div className="flex justify-center items-center h-screen px-4">
        <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-6 md:p-12">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between">
            <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-6">
              <h1 className="text-4xl font-bold mb-2">เข้าสู่ระบบ</h1>
              {error && <p className="text-slate-50 p-3 rounded-xl mb-4 bg-red-500">{error}</p>}
              <NavLink to={"/register"} className="mb-4 text-gray-600">
                หากคุณยังไม่มีบัญชี <span className="text-blue-900 cursor-pointer">ลงทะเบียนที่นี่</span>
              </NavLink>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm text-gray-700" htmlFor="username">
                    ชื่อผู้ใช้งาน
                  </label>
                  <input
                    type="text"

                    placeholder="Username"
                    className="mt-2 w-full px-4 py-2 border-b-2 border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-700" htmlFor="password">
                    รหัสผ่าน
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="mt-2 w-full px-4 py-2 border-b-2 border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="w-full py-2 bg-blue-900 text-white rounded-md shadow-md hover:bg-blue-600 transition mb-4">
                  เข้าสู่ระบบ
                </button>
              </form>
              <div className="text-center">
                <p className="text-gray-500 mb-3">หรือเข้าสู่ระบบด้วย</p>
                <div className="flex justify-center gap-4">
                  <button className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-900 text-white rounded-md shadow-md hover:bg-blue-600 transition">
                    <img src="./icon/google.svg" alt="Google" className="w-5 h-5" />
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-900 text-white rounded-md shadow-md hover:bg-blue-600 transition">
                    <img src="./icon/facebook.svg" alt="Facebook" className="w-5 h-5" />
                    Facebook
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                className="max-w-full h-auto"
                src="./img/login.svg"
                alt="Login illustration"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
