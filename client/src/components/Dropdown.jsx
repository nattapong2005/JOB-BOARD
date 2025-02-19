import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dropdown = ({setAuth}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('role'); 
    setAuth(false);
    navigate('/');
  };
  

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className=""
        type="button"
      >
        <div className="flex items-center gap-2">
        <div className="text-gray-600">Test kuy</div>
        <img className="w-10" src="../img/profile.png" alt="" />
        </div>
        
      </button>


      {isOpen && (
        <div className="absolute mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-white">
          <ul className="py-2 text-sm text-gray-600">
            <li>
              <button
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-700 dark:hover:text-white w-full text-start"
              >
                โปรไฟล์
              </button>
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
