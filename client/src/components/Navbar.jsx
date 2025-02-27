import { React, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { jwtDecode } from "jwt-decode";

const Navbar = ({ isAuth, setAuth }) => {
  const [role, setRole] = useState("");
  useEffect(() => {
    if (isAuth == true) {
      const token = localStorage.getItem("token");
      setRole(jwtDecode(token).role);
    }
  }, []);

  return (
    <div className="p-4">
      <div className="relative container mx-auto flex flex-col py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center text-2xl font-black space-x-2">
          {/* <img className='w-16' src="https://www.pixsector.com/cache/e7836840/av6584c34aabb39f00a10.png " alt="" /> */}
          <span className="text-2xl text-blue-900">FastJob</span>
        </div>
        <input className="peer hidden" type="checkbox" id="navbar-open" />
        <label className="absolute right-0 mt-1 cursor-pointer text-xl sm:hidden" htmlFor="navbar-open">
          <svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 448 512">
            <path
              fill="currentColor"
              d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z"
            />
          </svg>
        </label>
        <nav className="peer-checked:block hidden  py-6 sm:block sm:py-0 ">
          <ul className="flex flex-col gap-y-3 sm:flex-row sm:gap-x-8 sm:items-center ">
            <li className="group relative w-max">
              <NavLink to="/" className="flex items-center gap-2  text-gray-600">
                หางาน
              </NavLink>
              <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-blue-900 group-hover:w-full"></span>
            </li>
            <li className="group relative w-max">
              <NavLink to="/post" className="flex items-center gap-2  text-gray-600">
                ประกาศงาน
              </NavLink>
              <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-blue-900 group-hover:w-full"></span>
            </li>
            {role === "user" ? (
              <li className="group relative w-max">
                <NavLink to="/my-job" className="flex items-center gap-2 text-gray-600">
                  งานของฉัน
                </NavLink>
                <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-blue-900 group-hover:w-full"></span>
              </li>
            ) : role === "company" ? (
              <li className="group relative w-max">
                <NavLink to="/my-post" className="flex items-center gap-2 text-gray-600">
                  โพสต์ของฉัน
                </NavLink>
                <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-blue-900 group-hover:w-full"></span>
              </li>
            ) : (
              <></>
            )}
            {isAuth ? (
              <>
                {/* <li className='group relative w-max bg-red-600 py-1.5 px-3 rounded-md hover:bg-red-700'><button onClick={handleLogout} className="flex items-center gap-2  text-white" >ออกจากระบบ</button><span className="absolute -bottom-1 left-0 w-0 "></span></li> */}
                <Dropdown setAuth={setAuth} />
              </>
            ) : (
              <>
                <li className="group relative w-max bg-blue-900 py-1.5 px-3 rounded-md hover:bg-blue-700">
                  <NavLink to="/login" className="flex items-center gap-2  text-white">
                    เข้าสู่ระบบ
                  </NavLink>
                  <span className="absolute -bottom-1 left-0 w-0 "></span>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
