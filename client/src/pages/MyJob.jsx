import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import DataTable from "react-data-table-component";
import UtilsService from "../services/utils.service";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const MyJob = () => {
  const token = localStorage.getItem("token");
  const userID = jwtDecode(token).userID;
  const [post, setPost] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const formatThaiDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const paginationOptions = {
    rowsPerPageText: "จำนวนแถวต่อหน้า:", // เปลี่ยนข้อความของ "Rows per page"
    rangeSeparatorText: "จาก", // เปลี่ยนตัวแบ่งระหว่างตัวเลข
    selectAllRowsItem: true, // ให้ผู้ใช้เลือกดูทั้งหมดได้
    selectAllRowsItemText: "ทั้งหมด", // ข้อความของตัวเลือก "All"
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "NEW":
        return { text: "รอการตรวจสอบ", color: "bg-yellow-50 text-yellow-700" };
      case "APPROVED":
        return { text: "ผ่านการตรวจสอบ", color: "bg-green-50 text-green-700" };
      case "REJECTED":
        return { text: "ไม่ผ่านการตรวจสอบ", color: "bg-red-50 text-red-700" };
      default:
        return { text: "ไม่พบสถานะ", color: "bg-gray-400 text-white" };
    }
  };

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "oklch(0.967 0.003 264.542)",
        color: "#8a8a8a",
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
  };

  const columns = [
    {
      name: "โลโก้",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "รายการ",
      selector: (row) => row.jobpost.title,
    },
    {
      name: "วันที่สมัคร",
      selector: (row) => formatThaiDate(row.application_at),
    },
    {
      name: "สถานะ",
      cell: (row) => {
        const { text, color } = getStatusInfo(row.status);
        return <span className={`inline-block ${color} text-sm font-medium px-3 py-1 rounded-full`}>{text}</span>;
      },
    },
    {
      name: "ดำเนินการ",
      cell: (row) => (
        <>
          <button
            className="border border-blue-900 text-blue-8 00 px-4 py-1 rounded hover:bg-blue-800 hover:text-white transition"
            onClick={() => handleAction(row)}
          >
            <i className="fa-solid fa-eye"></i>
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleAction = (row) => {
    navigate(`/post/${row.jobpost.id}`);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:9999/application/user/${userID}`);
        if (res.status === 200) {
          setPost(res.data);
          setFilter(res.data);
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดโพสต์:", error);
        setError("เกิดข้อผิดพลาดในการโหลดโพสต์");
      }
    };

    fetchPost();
  }, []);

  useEffect(() => {
    const filtered = post.filter((p) => {
      const formattedDate = formatThaiDate(p.application_at);
      return formattedDate.includes(search) || p.jobpost?.title.toLowerCase().includes(search.toLowerCase());
    });
    setFilter(filtered);
  }, [search, post]);

  return (
    <Layout>
      <section className="container mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-blue-900 font-extrabold">My Job</h1>
            <h1 className="text-2xl font-bold">งานของฉัน</h1>
          </div>
          <input
            type="text"
            placeholder="🔍 ค้นหาโพสต์..."
            className="mb-2 py-1.5 px-2 border border-gray-300 rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}

        <div className="shadow-lg">
          <DataTable
            className="bg-red-500"
            columns={columns}
            data={filter}
            customStyles={customStyles}
            highlightOnHover
            pagination
            paginationComponentOptions={paginationOptions}
            responsive
            noDataComponent={<p className="text-red-600 text-lg p-4">ไม่มีพบข้อมูลดังกล่าว</p>}
          />
        </div>
      </section>
    </Layout>
  );
};

export default MyJob;
