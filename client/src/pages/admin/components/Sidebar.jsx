import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen, setAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setAuth(false);
    navigate("/login");
  };

  const navItems = [
    { title: "หน้าหลัก", url: "/admin" },
    { title: "ผู้ใช้งาน", url: "/user" },
    { title: "บริษัท", url: "/company" },
    { title: "ออกจากระบบ", action: handleLogout },
  ];

  // 🔹 ปิด Sidebar อัตโนมัติเมื่อขนาดหน้าจอเล็กกว่า 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    // เรียกใช้เมื่อติดตั้ง component และเมื่อมีการเปลี่ยนขนาดหน้าจอ
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsOpen]);

  return (
    <div
      className={`bg-white text-black transition-all duration-300 ease-in-out text-sm border-2 rounded-md border-[rgba(0,0,0,0.08)] ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="p-4 flex justify-between items-center">
        <h1
          className={`font-bold overflow-hidden transition-all duration-300 text-lg text-nowrap text-blue-900 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          Dashboard
        </h1>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg">
          {isOpen ? (
            <i className="fa-solid fa-x"></i>
          ) : (
            <i className="fa-solid fa-bars"></i>
          )}
        </button>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <div key={item.title}>
            {item.url ? (
              <NavLink
                to={item.url}
                className="px-4 py-3 hover:bg-[#F3F5F7] cursor-pointer flex items-center justify-between"
                onClick={() => setIsOpen(false)} // 🔹 ปิด Sidebar เมื่อคลิกลิงก์
              >
                <span
                  className={`ml-4 whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    isOpen ? "w-32 opacity-100" : "w-0 opacity-0"
                  }`}
                >
                  {item.title}
                </span>
              </NavLink>
            ) : (
              <button
                onClick={() => {
                  item.action();
                  setIsOpen(false); // 🔹 ปิด Sidebar เมื่อกดปุ่มออกจากระบบ
                }}
                className="w-full text-left px-4 py-3 hover:bg-[#F3F5F7] cursor-pointer flex items-center"
              >
                <span
                  className={`ml-4 whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    isOpen ? "w-32 opacity-100" : "w-0 opacity-0"
                  }`}
                >
                  {item.title}
                </span>
              </button>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
