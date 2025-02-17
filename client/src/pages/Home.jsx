import React from "react";
import data from "../data.json";
import Layout from "../components/Layout";
import TypingEffect from "react-typing-effect";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600, // Mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section>
        <div className="bg-blue-900 shadow-lg p-10 sm:p-80 lg:p-32 text-center flex flex-col items-center">
          <h1 className="text-white text-lg sm:text-4xl font-bold mb-3">
            หางานที่ใช่ หรือ หาฟรีแลนส์ที่ชอบกับเรา
          </h1>
          <TypingEffect
            className="text-white text-sm sm:text-2xl font-bold"
            text={[
              "ค้นหาฟรีแลนซ์มืออาชีพในสาขาที่คุณต้องการ",
              "พบกับโอกาสงานจากบริษัทชั้นนำ",
              "สร้างโปรเจกต์ที่ใช่กับทีมที่ชอบ",
              "เปลี่ยนไอเดียให้เป็นความจริงได้ที่นี่",
            ]}
            speed={50}
            eraseSpeed={30}
            typingDelay={500}
            eraseDelay={2000}
          />
          <div className="flex flex-col sm:flex-row justify-center mt-8 w-full gap-4">
            <input
              type="text"
              placeholder="ค้นหาฟรีแลนซ์...."
              className="p-3 w-full sm:max-w-lg block border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-500 transition duration-300"
            />
            <button
              type="button"
              className="p-3 px-6 bg-blue-700 text-white rounded-lg shadow-sm hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none transition duration-300"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Hot Work Section */}
      <section className="container mx-auto px-4 py-10">
        <h1 className="font-bold text-lg text-blue-900">Hot work</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">งานที่มาแรง</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full text-blue-600 text-2xl">
                {category.icon}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-blue-900">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600">{category.jobs}+ งาน</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="container mx-auto px-4 py-10">
        <h1 className="font-bold text-lg text-blue-900">Trusted by</h1>
        <h2 className="text-3xl font-bold  mb-8">ได้รับความไว้วางใจจาก</h2>
        <Slider
          {...settings}
          className="w-full max-w-5xl mx-auto cursor-pointer"
        >
          {data.companies.map((c, index) => (
            <div key={index} className="flex justify-center">
              <img src={c.img} className="h-28 object-contain mx-auto" />
            </div>
          ))}
        </Slider>
      </section>

      <section className="container mx-auto px-4 py-10">
        <h1 className="text-blue-900 font-bold">Recommended Jobs</h1>
        <h2 className="text-3xl font-bold  mb-6">งานแนะนำสำหรับคุณ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-12 h-12 object-contain rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-blue-900">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600">บริษัท {job.company}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-4">
                <p>📍 {job.location}</p>
                <p>💰 {job.salary}</p>
              </div>
              <button className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-800 focus:ring focus:ring-blue-300 focus:outline-none transition-all">
                สมัครงาน
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Main Features */}
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-blue-900 font-bold">Main Features</h1>
        <h2 className="text-3xl font-bold mb-6">ฟีเจอร์หลัก</h2>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-28">
            <div className="card max-w-md  p-6 flex flex-col items-center">
              <img
                className="w-32 mb-5"
                src="/icon/company.png"
                alt="สำหรับบริษัท"
              />
              <h1 className="text-center text-xl font-bold text-blue-900">
                สำหรับบริษัท
              </h1>
              <p className="text-center text-lg mt-2">
                โพสต์งาน คัดเลือกฟรีแลนซ์ อนุมัติหรือปฏิเสธผู้สมัคร
              </p>
            </div>
            <div className="card max-w-md  p-6 flex flex-col items-center">
              <img
                className="w-32 mb-5"
                src="/icon/freelance.png"
                alt="สำหรับฟรีแลนซ์"
              />
              <h1 className="text-center text-xl font-bold text-blue-900">
                สำหรับฟรีแลนซ์
              </h1>
              <p className="text-center text-lg mt-2">
                ค้นหางาน สมัครงาน และติดตามสถานะการสมัคร
              </p>
            </div>
            <div className="card max-w-md  p-6 flex flex-col items-center">
              <img
                className="w-32 mb-5"
                src="/icon/profile.png"
                alt="โปรไฟล์ของคุณ"
              />
              <h1 className="text-center text-xl font-bold text-blue-900">
                โปรไฟล์ของคุณ
              </h1>
              <p className="text-center text-lg mt-2">
                อัปเดตข้อมูลส่วนตัวและแสดงความสามารถของคุณ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Register us */}
      <section className="bg-slate-100 mt-5 mb-5 text-white py-20 text-center shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="job">
            <h1 className="text-4xl text-blue-900 font-bold mb-4">
              ร่วมเป็นส่วนหนึ่งกับเรา
            </h1>
            <p className="text-xl text-blue-900  mb-8">
              แพลตฟอร์มที่รวมงานที่ดี และคนเก่ง ไว้ในที่เดียว
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-blue-800 border border-white text-white px-6 py-3 rounded-lg font-bold">
                ลงทะเบียนตอนนี้
              </button>
            </div>
          </div>
          <div>
            <img width={300} src="./icon/job.svg" alt="" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
