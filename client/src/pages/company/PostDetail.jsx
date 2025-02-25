import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import UtilsService from "../../services/utils.service";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";

const PostDetail = () => {

  const { id } = useParams();
  const [file, setFile] = useState();
  const [detail, setDetail] = useState({});
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();

  const fetchJobDetail = async () => {
    try {
      const res = await UtilsService.getJobDetail(id);
      setDetail(res.data);
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!file) {
      alert("KUY NAHEE")
      return;
    }

    try {
      // await UtilsService.applyJob(token, id);
      // alert("สมัครงานสําเร็จ");
      console.log(file)
      setOpen(false)
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการสมัครงาน");
    }
  };

  useEffect(() => {
    fetchJobDetail();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
      <div className="flex justify-end">
        <button className="text-blue-900 hover:text-blue-800 font-semibold mb-4"onClick={() => navigate(-1)}>กลับไปหน้าหลัก </button>
      </div>
        {detail ? (
          <>
            <div className="bg-white shadow-md p-8 md:p-16 lg:p-28 border-2 border-blue-900 rounded-md mb-5">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">{detail.title}</h1>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-700">
                    {detail.company?.name || "ไม่ระบุบริษัท"}
                  </h2>
                </div>
                <button onClick={() => setOpen(true)} className="mt-4 md:mt-0 px-5 py-3 bg-blue-900 text-white rounded-md">
                  สมัครงานนี้
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="p-5 flex-1 bg-white shadow-md">
              <h2 className="text-xl font-bold border-l-4 border-blue-600 pl-4 mb-3">ข้อมูลบริษัท</h2>
                <p className="text-gray-700">• {detail.company?.description || "ไม่ระบุรายละเอียด"}</p>

                <h2 className="text-xl font-bold mt-4">รายละเอียดงาน</h2>
                <p className="text-gray-600">• {detail.description || "ไม่ระบุรายละเอียด"}</p>
                <p className="text-gray-600">• สถานที่: {detail.location || "ไม่ระบุ"}</p>
                <p className="text-gray-600">• เงินเดือน: {detail.salary || "ไม่ระบุ"} บาท</p>

                <h2 className="text-xl font-bold mt-4">ติดต่อ</h2>
                <p className="text-gray-600">• {detail.company?.address || "ไม่ระบุที่อยู่"}</p>
                <p className="text-gray-600">• {detail.company?.phone || "ไม่ระบุเบอร์โทร"}</p>

                <h2 className="text-xl font-bold mt-4">คุณสมบัติ</h2>
                <p className="text-gray-600">• {detail.requirement || "ไม่ระบุคุณสมบัติ"}</p>

                {/* <button className="mt-6 md:mt-0 px-3 py-1 bg-blue-900 text-white rounded-md">
                  สมัครงานนี้
                </button> */}
              </div>

              <div className="bg-white shadow-md p-5 rounded-md border border-gray-200 w-full md:w-[35%] ">
                <h2 className="text-xl font-bold border-l-4 border-blue-600 pl-4 mb-3">
                  ข้อมูลเพิ่มเติม
                </h2>
                <p className="text-gray-700 font-medium">
                  <span>• โพสวันที่ </span> 
                  {new Date(detail?.posted_at).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "Asia/Bangkok"
                  })}
                </p>
                <p className="text-gray-700 font-medium">
                • ประเภทงาน: {detail.jobtype?.type || "ไม่ระบุ"}
                </p>
                <p className="text-gray-700 font-medium">
                • เงินเดือน: {detail?.salary || "ไม่ระบุ"} บาท
                </p>
              </div>
            </div>
          </>
        ) : (
          navigate("/")
        )}
      </div>
      
      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-96 p-10">
          <div className="text-6xl text-green-700 mb-5">
          <i className="fa-solid fa-circle-check"></i>
          </div>
          <div className="mx-auto w-60">
            <h3 className="text-2xl font-bold text-gray-800">ยืนยันการสมัคร</h3>
            <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
              <p>กรอกประวัติ/แฟ้มสะสมผลงาน</p>
              <div className="relative mt-2">  
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full border-2 p-1.5 rounded-lg cursor-pointer bg-gray-400">
                      <p className="text-gray-600" ><i className="fa-solid fa-upload"></i> เลือกไฟล์ของคุณ</p>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleChange} />
                </label>
            </div> 
              </div>
              <div className="flex gap-4 mt-5">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full py-1.5 w-full">ส่งใบสมัคร</button>
                <div className="bg-red-700 hover:bg-red-600 text-white rounded-full py-1.5 w-full cursor-pointer"onClick={() => setOpen(false)} >ยกเลิก</div>
             </div>
            </form>
          </div>
        </div>
      </Modal>
    </Layout>
    
  );
};

export default PostDetail;
