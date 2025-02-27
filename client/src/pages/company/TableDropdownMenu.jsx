import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TableDropdownMenu = ({ row }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ ปิด dropdown เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ✅ ปุ่มหลัก กดเพื่อเปิด Dropdown */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-900 text-white px-3 py-1 rounded-md hover:bg-blue-800 transition-all"
      >
        ⋮
      </button>

      {/* ✅ Dropdown Menu (แสดงเมื่อกดปุ่ม) */}
      <div
        className={`absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden transition-all duration-200 ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* ปุ่ม "ดูโพสต์" */}
        <button
          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
          onClick={() => navigate(`/post/${row.id}`)}
        >
          <i className="fa-solid fa-eye mr-2"></i> ดูโพสต์
        </button>

        {/* ปุ่ม "แก้ไขโพสต์" */}
        <button
          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
          onClick={() => navigate(`/edit-post/${row.id}`)}
        >
          <i className="fa-solid fa-pen mr-2"></i> แก้ไขโพสต์
        </button>
      </div>
    </div>
  );
};

export default TableDropdownMenu;
