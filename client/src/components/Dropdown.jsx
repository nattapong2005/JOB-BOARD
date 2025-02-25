import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UtilsService from "../services/utils.service";

const Dropdown = ({setAuth}) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState([]);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setAuth(false);
    navigate('/');
  };
  
  const fetchProfile = async (token) => {
    const res = await UtilsService.profile(token);
    setProfile(res.data);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile(token);
    }
  }, []);
  


  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className=""
        type="button"
      >
        {/* <img className="w-10" src={profile?.user?.img || "../img/profile.png"} alt="" /> */}
        <img 
        className="w-10 h-10 rounded-full" 
        src={`http://localhost:9999/img/${profile?.user?.img || "/img/profile.png"}`} 
        alt="Profile"
        onError={(e) => { e.target.src = "/img/profile.png"; }} 
/>

      </button>


      {isOpen && (
        <div className="absolute mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-white">
          <ul className="py-2 text-sm text-gray-600">
            <li>
            <div className="text-gray-600 px-4 py-2">คุณ {profile?.user?.name} {profile?.user?.lastname}</div>
            <hr className="mb-2 mt-1" />
            </li>
            <li>
              <NavLink
                to={'/profile'}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-700 dark:hover:text-white w-full text-start"
              >
                โปรไฟล์ของคุณ
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-700 dark:hover:text-white w-full text-start"
              >
                ออกจากระบบ
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
