import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-white p-14 dark:bg-blue-900">
      <div className="flex flex-wrap justify-around items-center">
        {/* About Section */}
        <div className="flex flex-col text-sm sm:text-lg md:text-lg">
          <h1 className="font-bold text-xl dark:text-white">FastJob</h1>
          <h1 className="dark:text-gray-300">
            พื้นที่สำหรับหางานที่ใช่และฟรีแลนซ์ที่ชอบ
          </h1>
          <br />
          <h1 className="dark:text-gray-300">
            เราช่วยให้คุณพบกับโอกาสใหม่ ๆ ในอาชีพของคุณ
          </h1>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col text-sm sm:text-lg md:text-lg">
          <h1 className="font-bold text-xl dark:text-white">เมนู</h1>
          <NavLink to="/" className="dark:text-gray-300 hover:text-blue-700">
            - หน้าหลัก
          </NavLink>
          <NavLink
            className="dark:text-gray-300 hover:text-blue-700"
          >
            - หางาน
          </NavLink>
          <NavLink
            className="dark:text-gray-300 hover:text-blue-700"
          >
            - หาฟรีแลนซ์
          </NavLink>
          <NavLink
            className="dark:text-gray-300 hover:text-blue-700"
          >
            - เกี่ยวกับ
          </NavLink>
          <NavLink
            className="dark:text-gray-300 hover:text-blue-700"
          >
            - ติดต่อ
          </NavLink>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col text-sm sm:text-lg md:text-lg">
          <h1 className="font-bold text-xl dark:text-white">ช่องทางการติดต่อ</h1>
          <div className="flex gap-4 mt-2">
            <a
              href="#"
              rel="noopener noreferrer"
            >
              <img
                className="w-8 cursor-pointer"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                alt="Facebook"
              />
            </a>
            <a
              href="#"
              rel="noopener noreferrer"
            >
              <img
                className="w-8 cursor-pointer"
                src="https://static.vecteezy.com/system/resources/previews/027/395/710/non_2x/twitter-brand-new-logo-3-d-with-new-x-shaped-graphic-of-the-world-s-most-popular-social-media-free-png.png"
                alt="Twitter"
              />
            </a>
            <a
              href="#"
              rel="noopener noreferrer"
            >
              <img
                className="w-8 cursor-pointer"
                src="https://cdn-icons-png.flaticon.com/512/124/124011.png"
                alt="LinkedIn"
              />
            </a>
          </div>
          <p className="mt-2 dark:text-gray-300">support@fastjob.com</p>
          <p className="dark:text-gray-300">02-123-4567</p>
        </div>
      </div>

      {/* Divider */}
      <div className="container mx-auto">
        <hr className="mt-5 mb-5 dark:border-gray-500" />
      </div>

      {/* Copyright Section */}
      <div className="flex justify-center items-center text-sm sm:text-lg md:text-lg lg:text-lg gap-2 dark:text-gray-300  ">
        <i className="fa-solid fa-copyright"></i>
        <span className="font-bold">Copyright 2025 FastJob All Rights Reserved</span>
      </div>
    </div>
  );
};

export default Footer;