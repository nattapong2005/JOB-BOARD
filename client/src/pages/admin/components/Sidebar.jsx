// import { Box, ChevronDown, Home, Menu, MessageSquare, User, Wrench, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [activeDropdown, setActiveDropdown] = useState("");

  const navItems = [
    {
      title: "หน้าหลัก",
      url: "/admin",
    },
    {
      title: "โพสต์งาน",
      url: "/view-post",
    },
    {
      title: "บริษัท",
      url: "/companies",
    },
    {
      title: "Analytics",
      hasDropdown: false,
    },
    {
      title: "ออกจากระบบ",
    },
  ];

  return (
    <div
      className={`bg-white text-black transition-all duration-300 ease-in-out text-sm border-2 rounded-md border-[rgba(0,0,0,0.08)]
        ${isOpen ? "w-64" : "w-16"}`}
    >
      <div className="p-4 flex justify-between items-center">
        <h1
          className={`font-bold overflow-hidden transition-all duration-300 text-lg text-nowrap text-blue-900
          ${isOpen ? "opacity-100" : "opacity-0"}`}
        >
          Dashboard
        </h1>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg">
          {isOpen ? <i className="fa-solid fa-x"></i> : <i className="fa-solid fa-bars"></i>}
        </button>
      </div>

      <nav className="mt-6">
        {navItems.map((item) => (
          <div key={item.title}>
            <NavLink
            to={item.url}
              className="px-4 py-3 hover:bg-[#F3F5F7] cursor-pointer flex items-center justify-between"
            //   onClick={() => item.hasDropdown && isOpen && setActiveDropdown(activeDropdown === item.title ? "" : item.title)}
            >
              <div className="flex items-center">
                {/* <item.icon color="#000" /> */}
                <span
                  className={`ml-4 whitespace-nowrap overflow-hidden transition-all duration-300
                  ${isOpen ? "w-32 opacity-100" : "w-0 opacity-0"}`}
                >
                  {item.title}
                </span>
              </div>
            </NavLink>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
