import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import UtilsService from "./../../services/utils.service";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showConfirm, showSuccess } from "../../helpers/sweetalert";

const User = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);
  const formatThaiDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const fetchUsers = async () => {
    try {
      const res = await UtilsService.getUsers();
      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = user.filter(
      (p) => p.name.toLowerCase().includes(search.toLowerCase()) ||
       (p.lastname && p.email.toLowerCase().includes(search.toLowerCase())) || (p.phone.toLowerCase().includes(search.toLowerCase()))
    );
    setFilter(filtered);
  }, [search, user]);

  const handleEdit = (row) => {
    UtilsService.getUserById(row.id).then((res) => {
      setSelectedUser(res.data);
      setselectedUser(res.data);
    });
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
    showConfirm("คุณแน่ใจหรือไม่?", "หากลบผู้ใช้งานนี้จะไม่สามารถกู้คืนได้", async () => {
      try {
        await axios.delete(`http://localhost:9999/users/${row.id}`, {
          headers: {
            Authorization: token,
          },
        });
        showSuccess("ลบผู้ใช้งานเรียบร้อย", "");
        fetchUsers();
      } catch (error) {
        console.log(error);
      }
    });
  };

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "oklch(0.967 0.003 264.542)",
        color: "#8a8a8a",
        fontWeight: "bold",
        fontSize: "15px",
      },
    },
  };

  const columns = [
    {
      name: "ลำดับ",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "90px",
    },
    {
      name: "รายชื่อ",
      cell: (row) => `${row.name} ${row.lastname}`,
      wrap: true,
    },
    {
      name: "อีเมล",
      selector: (row) => row.email,
      wrap: true,
      hide: "md",
    },
    {
      name: "เบอร์โทร",
      selector: (row) => row.phone,
      wrap: true,
      hide: "md",
    },
    {
      name: "ดำเนินการ",
      cell: (row) => (
        <>
          <button
            className="me-2 border border-blue-600 text-blue-600 px-4 py-1 rounded-md hover:bg-blue-600 hover:text-white transition text-sm"
            onClick={() => handleEdit(row)}
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
          <h1 className="text-xl font-semibold">จัดการผู้ใช้</h1>
          <input
            type="text"
            placeholder="🔍 ค้นหาผู้ใช้งาน..."
            className="py-1.5 px-2 border border-gray-300 rounded-md w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <DataTable
            columns={columns}
            data={filter}
            customStyles={customStyles}
            highlightOnHover
            pagination
            responsive
            noDataComponent={<p className="text-gray-600 text-lg p-4">ไม่พบข้อมูล</p>}
          />
        </div>
      </section>

      {isViewModalOpen && selectedUser && (
        <div
          className={`fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300 ${
            modalAnimation ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`bg-white p-5 rounded-lg shadow-lg w-96 transform transition-all duration-300 ${
              modalAnimation ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-95 opacity-0"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-3">
              <i className="fa-solid fa-pen"></i> ผู้ใช้งาน {selectedUser.name}
            </h2>
            <hr className="mb-2" />
            <form>
              <input
                type="text"
                name="name"
                value={selectedUser.name || ""}
                // onChange={handleChange}
                readOnly
                className="w-full p-2 border rounded-md mb-2"
                placeholder="ชื่อ"
              />
              <input
                type="text"
                name="lastname"
                value={selectedUser.lastname || ""}
                // onChange={handleChange}
                readOnly
                className="w-full p-2 border rounded-md mb-2"
                placeholder="นามสกุล"
              />
              <input
                type="email"
                name="email"
                value={selectedUser.email || ""}
                // onChange={handleChange}
                readOnly
                className="w-full p-2 border rounded-md mb-2"
                placeholder="อีเมล"
              />
              <input
                type="text"
                name="phone"
                value={selectedUser.phone || ""}
                // onChange={handleChange}
                readOnly
                className="w-full p-2 border rounded-md mb-2"
                placeholder="เบอร์โทร"
              />
            </form>
            <div className="mt-4 flex justify-end">
              <button onClick={closeModal} className="px-5 py-1 bg-gray-400 text-white rounded-md">
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default User;
