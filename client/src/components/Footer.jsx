import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white p-6 sm:p-10 lg:p-14 dark:bg-blue-900">
      {/* Footer Content */}
      <div className="container mx-auto flex flex-col md:flex-row flex-wrap justify-between items-center text-center md:text-left gap-8">
        {/* About Section */}
        <div className="flex-1">
          <h1 className="font-bold text-2xl dark:text-white">FastJob</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            พื้นที่สำหรับหางานที่ใช่และฟรีแลนซ์ที่ชอบ
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            เราช่วยให้คุณพบกับโอกาสใหม่ ๆ ในอาชีพของคุณ
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1">
          <h1 className="font-bold text-2xl dark:text-white">เมนู</h1>
          <nav className="flex flex-col mt-2 space-y-2">
            <NavLink to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-700">
              - หน้าหลัก
            </NavLink>
            <NavLink className="text-gray-600 dark:text-gray-300 hover:text-blue-700">
              - หางาน
            </NavLink>
            <NavLink className="text-gray-600 dark:text-gray-300 hover:text-blue-700">
              - หาฟรีแลนซ์
            </NavLink>
            <NavLink className="text-gray-600 dark:text-gray-300 hover:text-blue-700">
              - เกี่ยวกับ
            </NavLink>
            <NavLink className="text-gray-600 dark:text-gray-300 hover:text-blue-700">
              - ติดต่อ
            </NavLink>
          </nav>
        </div>

        {/* Contact Section */}
        <div className="flex-1">
          <h1 className="font-bold text-2xl dark:text-white">ช่องทางการติดต่อ</h1>
          <div className="flex justify-center md:justify-start gap-4 mt-3">
            <a href="#" rel="noopener noreferrer">
              <img className="w-8 hover:scale-110 transition-transform" 
                   src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                   alt="Facebook" />
            </a>
            <a href="#" rel="noopener noreferrer">
              <img className="w-8 hover:scale-110 transition-transform"
                   src="https://static.vecteezy.com/system/resources/previews/027/395/710/non_2x/twitter-brand-new-logo-3-d-with-new-x-shaped-graphic-of-the-world-s-most-popular-social-media-free-png.png"
                   alt="Twitter" />
            </a>
            <a href="#" rel="noopener noreferrer">
              <img className="w-8 hover:scale-110 transition-transform"
                   src="https://cdn-icons-png.flaticon.com/512/124/124011.png"
                   alt="LinkedIn" />
            </a>
          </div>
          <p className="mt-3 text-gray-600 dark:text-gray-300">support@fastjob.com</p>
          <p className="text-gray-600 dark:text-gray-300">02-123-4567</p>
        </div>
      </div>

      {/* Divider */}
      <div className="container mx-auto">
        <hr className="mt-6 mb-6 border-gray-300 dark:border-gray-500" />
      </div>

      {/* Copyright Section */}
      <div className="flex flex-col md:flex-row justify-center items-center text-sm text-gray-600 sm:text-md md:text-lg dark:text-gray-300">
        <i className="fa-solid fa-copyright"></i>
        <span className="ml-1 font-bold">Copyright 2025 FastJob All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
