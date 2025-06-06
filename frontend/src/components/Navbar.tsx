import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       setShowDropdown(false);
  //       setShowMobileMenu(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-green-300 via-green-500 to-green-700 text-transparent bg-clip-text drop-shadow-[0_2px_5px_rgba(0,0,0,0.6)] cursor-pointer"
          onClick={() => navigate("/page")}
        >
          Expense Tracker
        </h1>

        {/* Hamburger Icon (mobile only) */}
        <div className="sm:hidden">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-white text-2xl"
          >
            <FaBars />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6 font-semibold text-lg">
          <button
            onClick={() => navigate("/page")}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded-md shadow-lg transition-all duration-300"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/page/myexpenses")}
            className="bg-green-400 hover:bg-green-500 text-white py-2 px-5 rounded-md shadow-lg transition-all duration-300"
          >
            My Expenses
          </button>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 bg-white hover:bg-gray-100 px-4 py-2 rounded-full shadow-md transition duration-200"
            >
              <FaUserCircle className="text-2xl text-green-600" />
              <span className="text-base text-gray-800">{username}</span>
            </button>

            {showDropdown && (
              <div className="absolute left-0 mt-3 w-30 text-center bg-white border border-gray-200 rounded-md shadow-lg z-20">
                <button
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("username");
                    navigate("/");
                  }}
                  className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-100 rounded-md transition duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="sm:hidden mt-4 flex flex-col items-start gap-3 font-semibold text-base">
          <button
            onClick={() => {
              navigate("/page");
              // setShowMobileMenu(false);
            }}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md w-full transition-all duration-300"
          >
            Home
          </button>
          <button
            onClick={() => {
              navigate("/page/myexpenses");
              // setShowMobileMenu(false);
            }}
            className="bg-green-400 hover:bg-green-500 text-white py-2 px-4 rounded-md w-full transition-all duration-300"
          >
            My Expenses
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("authToken");
              localStorage.removeItem("username");
              navigate("/");
              // setShowMobileMenu(false);
            }}
            className="bg-green-400 hover:bg-green-500 text-white py-2 px-4 rounded-md w-full transition-all duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
