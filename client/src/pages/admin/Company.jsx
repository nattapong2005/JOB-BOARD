import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import UtilsService from "./../../services/utils.service";
import DataTable from "react-data-table-component";
import axios from "axios";
import { showConfirm, showSuccess } from "../../helpers/sweetalert";

const Company = () => {
  const token = localStorage.getItem("token");
  const [company, setCompany] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);


  const fetchCompany = async () => {
    try {
      const res = await UtilsService.getCompany();
      if (res.status === 200) {
        setCompany(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  useEffect(() => {
    const filtered = company.filter(
      (p) => p.name.toLowerCase().includes(search.toLowerCase()) ||
       (p.address && p.phone.toLowerCase().includes(search.toLowerCase())) || (p.description.toLowerCase().includes(search.toLowerCase()))
    );
    setFilter(filtered);
  }, [search, company]);

  const handleEdit = (row) => {
    UtilsService.getCompanyById(row.id).then((res) => {
        setSelectedCompany(res.data);
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
    showConfirm("คุณแน่ใจหรือไม่?", "หากลบบริษัทนี้จะไม่สามารถกู้คืนได้", async () => {
      try {
        await axios.delete(`http://localhost:9999/company/${row.id}`, {
          headers: {
            Authorization: token,
          },
        });
        showSuccess("ลบบริษัทเรียบร้อย", "");
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
      name: "ชื่อบริษัท",
      cell: (row) => row.name,
      wrap: true,
    },
    {
      name: "รายละเอียด",
      selector: (row) => row.description,
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
          <h1 className="text-xl font-semibold">รายชื่อบริษัท</h1>
          <input
            type="text"
            placeholder="🔍 ค้นหาบริษัท..."
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

      {isViewModalOpen && selectedCompany && (
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
            <h2 className="text-xl font-semibold mb-3">
              <i className="fa-solid fa-pen"></i> บริษัท {selectedCompany.name}
            </h2>
            <hr className="mb-2" />
            <form>
              <input
                type="text"
                name="name"
                value={selectedCompany.name || ""}
                // onChange={handleChange}
                readOnly
                className="w-full p-2 border rounded-md mb-2"
                placeholder="ชื่อ"
              />
              <input
                type="text"
                name="lastname"
                value={selectedCompany.address || ""}
                // onChange={handleChange}
                readOnly
                className="w-full p-2 border rounded-md mb-2"
                placeholder="นามสกุล"
              />
              <input
                type="text"
                name="phone"
                value={selectedCompany.phone || ""}
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

export default Company;
