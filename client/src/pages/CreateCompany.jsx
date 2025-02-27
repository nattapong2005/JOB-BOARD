import axios from "axios";
import { useState } from "react";
import { showSuccess } from "../helpers/sweetalert";

export default function CreeateCompany() {
  const userID = localStorage.getItem("userID");
  const [formData, setFormData] = useState({
    userID: userID,
    name: "",
    description: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9999/company", formData).then((res) => {
      if (res.status == 200) {
        showSuccess("บริษัทถูกสร้างเรียบร้อย", "/login");
      }
    });
    // localStorage.removeItem("userID");
    // alert("บริษัทถูกสร้างเรียบร้อย!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">สร้างบริษัท</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">ชื่อบริษัท</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">คำอธิบาย</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">ที่อยู่</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">เบอร์โทรศัพท์</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <button type="submit" className="w-full bg-blue-900 text-white p-2 rounded-lg font-medium hover:bg-blue-800 transition">
            <i className="fa-regular fa-file"></i> สร้างบริษัท
          </button>
        </form>
      </div>
    </div>
  );
}
