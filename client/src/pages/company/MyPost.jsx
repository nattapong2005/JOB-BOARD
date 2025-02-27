import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import DataTable from "react-data-table-component";
import UtilsService from "../../services/utils.service";
import { useNavigate } from "react-router-dom";

const MyPost = () => {
  const token = localStorage.getItem("token");
  const [companyID, setCompanyID] = useState(null);
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
      name: "ลำดับ",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "รายการโพสต์",
      selector: (row) => row.title,
    },
    {
        name: "รายละเอียด",
        selector: (row) => row.description,
      },
      {
        name: "วันที่โพสต์",
        selector: (row) => formatThaiDate(row.posted_at),
      },
    {
      name: "ดำเนินการ",
      cell: (row) => (
        <>
          <button className="border border-blue-900 text-blue-8 00 px-4 py-1 rounded hover:bg-blue-800 hover:text-white transition" onClick={() => handleAction(row)}>
            <i class="fa-solid fa-eye"></i>
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleAction = (row) => {
    navigate(`/post/${row.id}`);
  };

  // 👉 ดึง Company ID
  useEffect(() => {
    const getCompanyID = async () => {
      try {
        const res = await UtilsService.profile(token);
        if (res.status === 200) {
          setCompanyID(res.data.user.company.id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCompanyID();
  }, [token]);

  useEffect(() => {
    if (!companyID) return;

    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:9999/jobpost/company/${companyID}`);
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
  }, [companyID]);

  useEffect(() => {
    const filtered = post.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(search.toLowerCase())) // ตรวจสอบว่ามี description หรือไม่
    );
    setFilter(filtered);
  }, [search, post]);

  return (
    <Layout>
      <section className="container mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-blue-900 font-extrabold">My Post</h1>
            <h1 className="text-2xl font-bold">โพสต์ของฉัน</h1>
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

        {/* DataTable แสดงโพสต์ */}
        <div className="shadow-lg">
          <DataTable
            className="bg-red-500"
            columns={columns}
            data={filter}
            customStyles={customStyles}
            highlightOnHover
            pagination
            responsive
            noDataComponent={<p className="text-red-600 text-lg p-4">ไม่มีพบข้อมูลดังกล่าว</p>}
          />
        </div>
      </section>
    </Layout>
  );
};

export default MyPost;
