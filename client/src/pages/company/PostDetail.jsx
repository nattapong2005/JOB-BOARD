import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import UtilsService from "../../services/utils.service";
import Layout from "../../components/Layout";
import { showSuccess, showConfirm, showError } from "../../helpers/sweetalert";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const PostDetail = () => {
  const token = localStorage.getItem('token');
  const userID = token ? jwtDecode(token).userID : null;
  const navigate = useNavigate();

  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("ยังไม่ได้เลือกไฟล์");
  const [detail, setDetail] = useState({});
  const [formData, setFormData] = useState({
    userID: userID,
    jobpostID: id,
    portfolio: "",
  });


  const fetchJobDetail = async () => {
    try {
      const res = await UtilsService.getJobDetail(id);
      // console.log(res.data);
      setDetail(res.data);
    } catch (error) {
      console.error(error);
      // navigate("/");
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0]) {
     setFileName("เลือกไฟล์เรียบร้อย")
     setFormData({
      ...formData,
      portfolio: e.target.files[0],
     })
    }
  };

  const handleSubmit = async (e) => {
    if(e) e.preventDefault();
    // console.log(formData)
    try {
      showConfirm("คุณแน่ใจแล้วใช่หรือไม่", "ตรวจสอบข้อมูลให้ถูกต้อง", () => {
        axios.post("http://localhost:9999/application", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          if(res.status == 200) {
            showSuccess("ส่งใบสมัครเรียบร้อย","/")
          }
        }).catch((error) => {
          showError(error.response.data.error, "/post")  
        })
      });
      
    } catch (error) {
      // console.log(error)
    }
  };

  useEffect(() => {
    fetchJobDetail();

  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 px">
        <div className="flex justify-end">
          <button className="text-blue-900 hover:text-blue-800 font-semibold mb-4" onClick={() => navigate(-1)}>
            ย้อนกลับ
          </button>
        </div>

        {detail ? (
          <>
            <div className="bg-white shadow-md p-8 md:p-16 lg:p-28 border-2 border-blue-900 rounded-md mb-5">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">{detail.title}</h1>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-700">{detail.company?.name || "ไม่ระบุบริษัท"}</h2>
                </div>
                <div className="flex flex-col">
                  <p> {detail.jobtype?.name} </p>
                  <p>{detail.jobtype?.type}</p>
                </div>
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
              </div>

              <div className="bg-white shadow-md p-5 rounded-md border border-gray-200 w-full md:w-[35%] ">
                <h2 className="text-xl font-bold border-l-4 border-blue-600 pl-4 mb-3">ข้อมูลเพิ่มเติม</h2>
                <p className="text-gray-700 font-medium">
                  <span>• โพสวันที่ </span>
                  {new Date(detail?.posted_at).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "Asia/Bangkok",
                  })}
                </p>
                {/* <p className="text-gray-700 font-medium">• ประเภทงาน: {detail.jobtype?.type || "ไม่ระบุ"}</p> */}
                <p className="text-gray-700 font-medium">• เงินเดือน: {detail?.salary || "ไม่ระบุ"} บาท</p>
                {/* อัปโหลดไฟล์ */}
                <div className="flex flex-col w-60 ms-2">
                  <div className="mt-2 ">
                    <label className="block text-lg font-bold mb-2">
                      แฟ้มสะสมผลงาน <span className="text-red-500">(ถ้ามี)</span>
                    </label>
                    <div className="flex ">
                      <label htmlFor="dropzone-file" className="flex w-full border-2 p-1.5 px-5 rounded-lg cursor-pointer bg-gray-300">
                        <p className="text-gray-600">
                          <i className="fa-solid fa-cloud-arrow-up"></i> <span>{fileName}</span>
                        </p>
                        <input id="dropzone-file" type="file" className="hidden" onChange={handleChange} />
                      </label>
                    </div>
                  </div>
                  {
                    token ? (
                      <button onClick={handleSubmit} className="mt-2 py-2 bg-blue-900 text-white rounded-md">
                      สมัครงานนี้
                    </button>
                    ) : (
                      <button onClick={() => showError("กรุณาเข้าสู่ระบบก่อนใช้งาน", "/login")} className="mt-2 text-center py-2 bg-blue-900 text-white rounded-md">
                      สมัครงานนี้
                    </button>
                    )
                  }
                </div>
              </div>
            </div>
          </>
        ) : (
          navigate("/")
        )}
      </div>
    </Layout>
  );
};

export default PostDetail;
