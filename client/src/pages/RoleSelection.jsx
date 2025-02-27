import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import UtilsService from "../services/utils.service";
import { showSuccess } from "../helpers/sweetalert";

const RoleSelection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "", 
  });
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    if (storedUserID) {
      setUserID(storedUserID);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (userID) {
      const fetchUserData = async () => {
        try {
          const userData = await UtilsService.getUserById(userID);
          if (!userData.role) {
            setLoading(false);
          } else {
            navigate("/");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [userID, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      await AuthService.updateRole(userID, formData.role).then((res) => {
        if(res.data.message == "user") {
            showSuccess("เปลี่ยนบทบาทเรียบร้อย", "/login");
        }else {
            navigate("/create-company");
        }
      });
      
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
<div className="flex flex-col items-center justify-center h-screen">
  <h2 className="text-3xl font-bold mb-6">เลือกบทบาทของคุณ</h2>
  <form action="" onSubmit={handleSubmit}>
  <div className="flex gap-6">
    {/* Card สำหรับ User */}
    <div
      className={`p-6 border-2 rounded-lg shadow-md cursor-pointer transition bg-white 
      ${formData.role === "user" ? "border-blue-500 text-blue-600" : "border-gray-300"}`}
      onClick={() => handleChange({ target: { name: "role", value: "user" } })}
    >
      <h3 className="text-xl font-semibold mb-2">สมัครเป็น ฟรีแลนส์</h3>
      <p className="text-sm text-gray-600">สำหรับผู้ที่ต้องการหางาน</p>
    </div>

    {/* Card สำหรับ Company */}
    <div
      className={`p-6 border-2 rounded-lg shadow-md cursor-pointer transition bg-white 
      ${formData.role === "company" ? "border-blue-500 text-blue-600" : "border-gray-300"}`}
      onClick={() => handleChange({ target: { name: "role", value: "company" } })}
    >
      <h3 className="text-xl font-semibold mb-2">สมัครเป็น บริษัท</h3>
      <p className="text-sm text-gray-600">สำหรับบริษัทที่ต้องการหาพนักงาน</p>
    </div>
  </div>

  {/* ปุ่มยืนยัน */}
  <button
    type="submit"
    onClick={handleSubmit}
    className="mt-6 px-6 py-3 bg-blue-900 text-white cursor-pointer  rounded-md shadow-xl hover:bg-blue-800 transition w-full"
    disabled={!formData.role} // ป้องกันการกดถ้ายังไม่เลือกบทบาท
  >
    <i className="fa-regular fa-hand"></i> ยืนยัน
  </button>
  </form>
</div>

  );
};

export default RoleSelection;