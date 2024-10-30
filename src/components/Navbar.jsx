import React, { useState } from "react";

import Hamburger from "hamburger-react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import NavLink from "../components/NavLink"; // Import NavLink
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to control dropdown visibility
  const { isAuthenticated, user, logout } = useAuth(); // Use AuthContext for user info and logout
  const location = useLocation(); // Get current location

  const toggleMenu = () => {
    setIsMenu(!isMenu);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible); // Toggle dropdown visibility
  };
  

  return (
    <div className="w-full animate-slideInFromTop">
      {/* Navbar */}
      <div className="w-full h-20 flex items-center justify-between">
        <div>
          <img src="/FitnessAppLogo.png" className="w-16 border border-gray-400 rounded-full" alt="Logo" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex relative gap-4">
          <NavLink to="/" className="cursor-pointer">
            Home
          </NavLink>
          <NavLink to="/Features" className="cursor-pointer">
            Features
          </NavLink>
          <NavLink to="/AboutUs" className="cursor-pointer">
            About Us
          </NavLink>
          <NavLink to="/ContactUs" className="cursor-pointer">
            Contact Us
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="scale-75 border border-slate-600 rounded-md focus:outline-none"
          >
            <Hamburger toggled={isMenu} toggle={toggleMenu} />
          </button>
        </div>

        {/* Desktop User Menu */}
        <div className="hidden md:flex items-center justify-between gap-4 relative">
          {!isAuthenticated ? (
            <>
              <Link
                to="/SignIn"
                className="cursor-pointer text-xl text-gray-500"
              >
                Login
              </Link>
              <Link
                to="/Register"
                className="cursor-pointer text-xl text-gray-500"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <span
                className="cursor-pointer text-xl text-gray-500 flex gap-2"
                onClick={toggleDropdown}
              >
                {user?.name || "User"}
                <FontAwesomeIcon icon={faCaretDown} />

                {/* Show the logged-in user's name */}
              </span>
              {/* Dropdown Menu */}
              {isDropdownVisible && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <Link
                    to="/profile/update-profile"
                    className="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownVisible(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsDropdownVisible(false);
                    }}
                    className="w-full text-left block px-4 py-2 text-xl text-gray-700 hover:bg-gray-100"
                  >
                    <FiLogOut size={20} className="inline mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenu && (
        <AnimatePresence>
          <motion.div className="flex flex-col md:hidden gap-2 p-4">
            <NavLink to="/" onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink to="/Features" onClick={toggleMenu}>
              Features
            </NavLink>
            <NavLink to="/AboutUs" onClick={toggleMenu}>
              About Us
            </NavLink>
            <NavLink to="/ContactUs" onClick={toggleMenu}>
              Contact Us
            </NavLink>
            {!isAuthenticated ? (
              <>
                <Link
                  to="/SignIn"
                  className="cursor-pointer text-sm text-gray-500"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/Register"
                  className="cursor-pointer text-sm text-gray-500"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative ">
                <span
                  className="cursor-pointer text-sm flex gap-2 text-gray-500"
                  onClick={toggleDropdown}
                >
                  {user?.name || "User"}
                  <FontAwesomeIcon icon={faCaretDown} />
                </span>
                {isDropdownVisible && (
                  <div className=" left-0 mt-0 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <Link
                      to="/profile/update-profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownVisible(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiLogOut size={20} className="inline mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Navbar;
