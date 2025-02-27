import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import UtilsService from "./../../services/utils.service";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showConfirm, showSuccess } from "../../helpers/sweetalert";

const AdminHome = () => {
  const token = localStorage.getItem("token");
  const [post, setPost] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);
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

  const fetchPosts = async () => {
    try {
      const res = await UtilsService.getJobPost();
      if (res.status === 200) {
        setPost(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = post.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
    );
    setFilter(filtered);
  }, [search, post]);

  const handleView = (row) => {
    UtilsService.getJobDetail(row.id).then((res) => {
      setSelectedPost(res.data);
    })
    setIsViewModalOpen(true);
    setTimeout(() => {
      setModalAnimation(true);
    }, 50);
  };

  const closeModal = () => {
    setModalAnimation(false);
    setTimeout(() => {
      setIsViewModalOpen(false);
    }, 300);
  };


  const handleDelete = async (row) => {
    showConfirm("คุณแน่ใจหรือไม่?", "หากลบโพสต์นี้จะไม่สามารถกู้คืนได้", async () => {
      try {
        await axios.delete(`http://localhost:9999/jobpost/${row.id}`, {
          headers: {
            Authorization: token,
          },
        });
        showSuccess("ลบโพสต์เรียบร้อย", "");
        fetchPosts();
      } catch (error) {
        console.log(error);
      }
    });
  };

  const columns = [
    {
      name: "ลำดับ",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "รายการโพสต์",
      selector: (row) => row.title,
      wrap: true,
    },
    {
      name: "รายละเอียด",
      selector: (row) => row.description,
      wrap: true,
      hide: "md",
    },
    {
      name: "วันที่โพสต์",
      selector: (row) => formatThaiDate(row.posted_at),
      hide: "sm",
    },
    {
      name: "ดำเนินการ",
      cell: (row) => (
        <>
          <button
            className="me-2 border border-blue-600 text-blue-600 px-4 py-1 rounded-md hover:bg-blue-600 hover:text-white transition text-sm"
            onClick={() => handleView(row)}
          >
            <i className="fa-solid fa-eye"></i>
          </button>
          <button
            className="border border-red-600 text-red-600 px-4 py-1 rounded-md hover:bg-red-600 hover:text-white transition text-sm"
            onClick={() => handleDelete(row)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <section className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-3">
          <h1 className="text-xl font-semibold">จัดการโพสต์</h1>
          <input
            type="text"
            placeholder="🔍 ค้นหาโพสต์..."
            className="py-1.5 px-2 border border-gray-300 rounded-md w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <DataTable
            columns={columns}
            data={filter}
            highlightOnHover
            pagination
            responsive
            noDataComponent={<p className="text-gray-600 text-lg p-4">ไม่พบข้อมูล</p>}
          />
        </div>
      </section>

      {isViewModalOpen && selectedPost && (
        <div className={`fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300 ${
          modalAnimation ? "opacity-100" : "opacity-0"
        }`}>
          <div className={`bg-white p-5 rounded-lg shadow-lg w-96 transform transition-all duration-300 ${
            modalAnimation ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-95 opacity-0"
          }`}>
            <h2 className="text-2xl font-semibold mb-3"><i className="fa-solid fa-pen-to-square"></i> รายการ {selectedPost.title}</h2>
            <hr  className="mb-2"/>
            <p className="text-gray-500 text-sm mt-2">
              <span className="font-bold">บริษัท</span> {selectedPost.company.name}
            </p>
            <p className="text-gray-500">รายละเอียด {selectedPost.description}</p>
            <p className="text-gray-500 text-sm mt-2">
            <span className="font-bold">ประเภท</span> {selectedPost.jobtype.type}
            </p>
            <p className="text-gray-500 text-sm mt-2">
            <span className="font-bold">ควมต้องการ</span> {selectedPost.requirement}
            </p>
            <p className="text-gray-500 text-sm mt-2">
            <span className="font-bold">สถานที่</span> {selectedPost.location}
            </p>
            <p className="text-gray-500 text-sm mt-2">
            <span className="font-bold">เงินเดือน</span> {selectedPost.salary} บาท
            </p>
            <p className="text-gray-500 text-sm mt-2">
            <span className="font-bold">โพสต์วันที่</span> {formatThaiDate(selectedPost.posted_at)}
            </p>  
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-5 py-1 bg-gray-400 text-white rounded-md"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminHome;
