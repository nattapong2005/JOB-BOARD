import React, { useEffect, useState } from "react";
import data from "../data.json";
import Layout from "../components/Layout";
import TypingEffect from "react-typing-effect";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import UtilsService from "../services/utils.service";
import { NavLink, useNavigate } from "react-router-dom";

const Home = () => {

  const faqs = [
    {
      question: "แพลตฟอร์มนี้เหมาะกับใครบ้าง?",
      answer: "แพลตฟอร์มนี้เหมาะสำหรับทั้งบริษัทที่ต้องการจ้างงาน และฟรีแลนซ์ที่กำลังมองหางานที่ตรงกับทักษะของตนเอง",
    },
    {
      question: "การสมัครใช้งานมีค่าใช้จ่ายหรือไม่?",
      answer: "การสมัครสมาชิกและการใช้งานเบื้องต้นไม่มีค่าใช้จ่าย แต่บางฟีเจอร์อาจมีค่าธรรมเนียมเพิ่มเติม",
    },
    {
      question: "ฉันจะหางานที่เหมาะกับฉันได้อย่างไร?",
      answer: "คุณสามารถค้นหางานโดยใช้คีย์เวิร์ดในช่องค้นหา หรือตรวจสอบงานแนะนำที่ตรงกับโปรไฟล์ของคุณ",
    },
    {
      question: "บริษัทสามารถโพสต์งานได้อย่างไร?",
      answer: "หลังจากสมัครสมาชิกแล้ว บริษัทสามารถสร้างประกาศงานได้ผ่านทางแดชบอร์ด และจัดการใบสมัครได้อย่างง่ายดาย",
    },
    {
      question: "ฉันจะติดตามสถานะการสมัครงานของฉันได้อย่างไร?",
      answer: "คุณสามารถดูสถานะการสมัครของคุณได้ที่หน้าประวัติการสมัครงานของคุณในระบบ",
    },
  ];


  const [searchQuery, setSearchQuery] = useState("");
  const [hotwork, setHotwork] = useState([]);
  const [jobs, setJob] = useState([]);
  const navigate = useNavigate();

  const fetchHotwork = async () => {
    const res = await UtilsService.jobtype();
    setHotwork(res.data.slice(0, 6));
  };

  const fetchJobPost = async () => {
    const res = await UtilsService.getJobPost();
    let jobs = res.data.slice(0,3);
    // console.log(jobs)
    jobs = await Promise.all(
      jobs.map(async (job) => {
        if (job.company?.userID) {
          try {
            const res = await UtilsService.companyProfile(job.company.userID);
            return { ...job, companyImg: res.data.company?.img || null };
          } catch (error) {
            console.error(error);
            return { ...job, companyImg: null };
          }
        }
        return job;
      })
    );

    setJob(jobs);
  };

  useEffect(() => {
    fetchHotwork();
    fetchJobPost();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/post?search=${encodeURIComponent(searchQuery)}`);
    }
  };

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
          <h1 className="text-white text-lg sm:text-4xl font-bold mb-3">หางานที่ใช่ หรือ หาฟรีแลนส์ที่ชอบกับเรา</h1>
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
              placeholder="ค้นหางาน...."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-3 w-full sm:max-w-lg block border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-500 transition duration-300"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="p-3 px-6 bg-blue-700 text-white rounded-lg shadow-sm hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none transition duration-300"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Hot Work Section */}
      <section className="container mx-auto px-4 py-10">
        <h1 className="font-extrabold text-lg text-blue-900">Hot work</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">งานที่มาแรง</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotwork.map((category, index) => (
            <div
              key={index}
              className="flex items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              {/* <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full text-blue-600 text-2xl">
                {category.icon}
              </div> */}
              <div className="ml-4">
                <h3 className="text-lg font-bold text-blue-900">{category.name}</h3>
                {/* <p className="text-sm text-gray-600">{category.jobs}+ งาน</p> */}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="container mx-auto px-4 py-10">
        <h1 className="font-extrabold text-lg text-blue-900">Trusted by</h1>
        <h2 className="text-3xl font-bold  mb-8">ได้รับความไว้วางใจจาก</h2>
        <Slider {...settings} className="w-full max-w-5xl mx-auto cursor-pointer">
          {data.companies.map((c, index) => (
            <div key={index} className="flex justify-center">
              <img src={c.img} className="h-28 object-contain mx-auto" />
            </div>
          ))}
        </Slider>
      </section>

      <section className="container mx-auto px-4 py-10">
        <h1 className="text-blue-900 font-extrabold">Latest Posts</h1>
        <h2 className="text-3xl font-bold  mb-6">โพสต์ล่าสุด</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div
              key={job.id || index}
              className="p-6 bg-white shadow-sm rounded-md border border-gray-200 hover:shadow-md transition duration-300"
            >
              <div className="flex items-center mb-2 ms-1">
                {job.companyImg ? (
                  <img className="w-10 h-10 rounded-lg" src={`http://localhost:9999/img/${job.companyImg}`} alt="Company Logo" />
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
                <p className="ms-2 text-gray-700">
                  <span className="font-bold">{job.salary}</span> บาท
                </p>
                <p className="text-gray-700">
                  <span>โพสวันที่ </span>
                  {new Date(job.posted_at).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "Asia/Bangkok",
                  })}
                </p>
              </div>
              <NavLink
                to={`/post/${job.id}`}
                className="mt-4 inline-block w-full text-center px-4 py-2 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition duration-300 shadow-md"
              >
                <i className="fa-regular fa-folder-open"></i> สมัครงานนี้
              </NavLink>
            </div>
          ))}
        </div>
      </section>

      {/* Main Features */}
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-blue-900 font-extrabold ">Main Features</h1>
        <h2 className="text-3xl font-bold mb-6">ฟีเจอร์หลัก</h2>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-28">
            <div className="card max-w-md  p-6 flex flex-col items-center">
              <img className="w-32 mb-5" src="/icon/company.png" alt="สำหรับบริษัท" />
              <h1 className="text-center text-xl font-bold text-blue-900">สำหรับบริษัท</h1>
              <p className="text-center text-lg mt-2">โพสต์งาน คัดเลือกฟรีแลนซ์ อนุมัติหรือปฏิเสธผู้สมัคร</p>
            </div>
            <div className="card max-w-md  p-6 flex flex-col items-center">
              <img className="w-32 mb-5" src="/icon/freelance.png" alt="สำหรับฟรีแลนซ์" />
              <h1 className="text-center text-xl font-bold text-blue-900">สำหรับฟรีแลนซ์</h1>
              <p className="text-center text-lg mt-2">ค้นหางาน สมัครงาน และติดตามสถานะการสมัคร</p>
            </div>
            <div className="card max-w-md  p-6 flex flex-col items-center">
              <img className="w-32 mb-5" src="/icon/profile.png" alt="โปรไฟล์ของคุณ" />
              <h1 className="text-center text-xl font-bold text-blue-900">โปรไฟล์ของคุณ</h1>
              <p className="text-center text-lg mt-2">อัปเดตข้อมูลส่วนตัวและแสดงความสามารถของคุณ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Register us */}
      <section className="bg-slate-100 mt-5 mb-5 text-white py-20 text-center shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="job">
            <h1 className="text-4xl text-blue-900 font-bold mb-4">ร่วมเป็นส่วนหนึ่งกับเรา</h1>
            <p className="text-xl text-blue-900  mb-8">แพลตฟอร์มที่รวมงานที่ดี และคนเก่ง ไว้ในที่เดียว</p>
            <div className="flex justify-center gap-4">
              <NavLink to={"/register"} className="bg-blue-800 border border-white text-white px-6 py-3 rounded-lg font-bold">
                ลงทะเบียนตอนนี้
              </NavLink>
            </div>
          </div>
          <div>
            <img width={300} src="./icon/job.svg" alt="" />
          </div>
        </div>
      </section>


      <section className="container mx-auto px-4 py-10">
      <h1 className="text-blue-900 font-extrabold  text-lg">FAQ</h1>
      <h2 className="text-3xl font-bold mb-6">คำถามที่พบบ่อย</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md cursor-pointer transition duration-300 hover:shadow-lg">
            <details className="group">
              <summary className="font-bold text-blue-900 text-lg flex justify-between items-center cursor-pointer">
                {faq.question}
                <span className="text-blue-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-2">{faq.answer}</p>
            </details>
          </div>
        ))}
      </div>
    </section>

{/* Slider for Testimonials */}
<Slider
  {...{
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
  }}
  className="w-full max-w-6xl mx-auto mb-10"
>
  {[
    {
      name: "นัฐพงษ์ สุดเท่",
      role: "ฟรีแลนซ์",
      comment: "แพลตฟอร์มนี้ช่วยให้ฉันหางานได้ง่ายขึ้น และยังได้เจอโปรเจกต์ที่ท้าทาย!",
    },
    {
      name: "ขัน สามมิล",
      role: "HR Manager",
      comment: "เราพบฟรีแลนซ์ที่ตรงกับความต้องการของบริษัทได้อย่างรวดเร็ว!",
    },
    {
      name: "มาย เกย์ดุ",
      role: "Graphic Designer",
      comment: "ชอบการทำงานผ่านแพลตฟอร์มนี้มาก เพราะมีระบบการจัดการที่ดีเยี่ยม!",
    },
    {
      name: "ติ๊ก ชิโร่",
      role: "Software Engineer",
      comment: "ระบบนี้ทำให้ฉันได้เจองานที่ตรงกับทักษะของฉันมากขึ้น!",
    },
    {
      name: "เอมมี่ เจ",
      role: "Marketing Specialist",
      comment: "แพลตฟอร์มนี้ช่วยให้ฉันขยายเครือข่ายทางธุรกิจได้อย่างง่ายดาย!",
    },
    {
      name: "ต้น นาวา",
      role: "Web Developer",
      comment: "รักการทำงานที่นี่! ระบบสนับสนุนดีและโปรเจกต์มีคุณภาพสูง!",
    },
    {
      name: "จูน อลิส",
      role: "Content Writer",
      comment: "สะดวก รวดเร็ว และมีโอกาสใหม่ๆ มาให้เลือกเสมอ ฉันแนะนำเลย FastJob!",
    },
    {
      name: "แมน แมน",
      role: "UI/UX Designer",
      comment: "การออกแบบแพลตฟอร์มใช้งานง่ายมาก ทำให้การค้นหางานสะดวกสุดๆ!",
    },
    {
      name: "กาย อินดี้",
      role: "นักพัฒนาเกม",
      comment: "แพลตฟอร์มนี้เหมาะกับคนทำเกมอย่างผมมาก งานเยอะและตรงกับสายงาน!",
    },
    {
      name: "หญิง พลอย",
      role: "นักบัญชี",
      comment: "การจัดการงานและเอกสารในแพลตฟอร์มนี้ดีมาก ใช้งานง่าย!",
    },
  ].map((testimonial, index) => (
    <div key={index} className="p-4">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow h-50">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-blue-900">{testimonial.name}</h3>
          <p className="text-sm text-gray-600">{testimonial.role}</p>
        </div>
        <p className="text-gray-700 text-sm italic">"{testimonial.comment}"</p>
      </div>
    </div>
  ))}
</Slider>



      
    </Layout>
  );
};

export default Home;
