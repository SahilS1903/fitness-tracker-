import React, { useCallback, useEffect, useState } from "react";
import Logo from "../assets/Logo.png";
import Hamburger from "hamburger-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { fadeIn } from "../animations";

const Navbar = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState("Home");

  const toggleMenu = () => {
    setIsMenu(!isMenu);
  };

  const handleFocus = useCallback(() => {
    // Set focus to the "Home" link only when the component is mounted
    setIsMenuOpen("Home");
  }, []);

  

  useEffect(() => {
    handleFocus();
  }, [handleFocus]);

  return (
    <div className="w-full animate-slideInFromTop">
      {/* Navbar */}
      <div className="w-full h-20 flex items-center justify-between">
        <div>
          <img src={Logo} className="w-24" alt="Logo" />
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex relative gap-4">
          <Link
            to="/"
            className={`cursor-pointer ${
              isMenuOpen === "Home"
                ? "text-black border-b-2 text-sm border-black"
                : "text-gray-500"
            }`}
            onClick={() => setIsMenuOpen("Home")}
          >
            Home
          </Link>
          <Link
            to="/Features"
            className={`cursor-pointer  ${
              isMenuOpen === "Features"
                ? "text-black border-b-2 text-sm border-black"
                : "text-gray-500"
            }`}
            onClick={() => setIsMenuOpen("Features")}
          >
            Features
          </Link>
          <Link
            to="/AboutUs"
            className={`cursor-pointer ${
              isMenuOpen === "About Us"
                ? "text-black border-b-2 text-sm border-black"
                : "text-gray-500"
            }`}
            onClick={() => setIsMenuOpen("About Us")}
          >
            About Us
          </Link>
          <Link
            to={"/ContactUs"}
            className={`cursor-pointer ${
              isMenuOpen === "Contact Us"
                ? "text-black border-b-2 text-xs border-black"
                : "text-gray-500"
            }`}
            onClick={() => setIsMenuOpen("Contact Us")}
          >
            Contact Us
          </Link>
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

        {/* Desktop Login/Register */}
        <div className="hidden md:flex items-center justify-between gap-4">
          <Link
            to={"/SignIn"}
            className="cursor-pointer text-sm text-gray-500"
            onClick={() => setIsMenuOpen("")}
          >
            Login
          </Link>
          <Link
            to={"/Register"}
            className="cursor-pointer text-sm text-gray-500"
            onClick={() => setIsMenuOpen("")}
          >
            Register
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenu && (
        <AnimatePresence>
          <motion.div className="flex flex-col md:hidden gap-2 p-4  ">
            <Link
              to={"/"}
              className={`cursor-pointer text-sm ${
                isMenuOpen === "Home" ? "text-black" : "text-gray-500"
              }`}
              onClick={() => {
                setIsMenuOpen("Home");
                toggleMenu();
              }}
            >
              Home
            </Link>
            <Link
              to={"/Features"}
              className={`cursor-pointer text-sm ${
                isMenuOpen === "Features" ? "text-black" : "text-gray-500"
              }`}
              onClick={() => {
                setIsMenuOpen("Features");
                toggleMenu();
              }}
            >
              Features
            </Link>
            <Link
              to={"/AboutUs"}
              className={`cursor-pointer text-sm ${
                isMenuOpen === "About Us" ? "text-black" : "text-gray-500"
              }`}
              onClick={() => {
                setIsMenuOpen("About Us");
                toggleMenu();
              }}
            >
              About Us
            </Link>
            <Link
              to={"/ContactUs"}
              className={`cursor-pointer text-sm ${
                isMenuOpen === "Contact Us" ? "text-black" : "text-gray-500"
              }`}
              onClick={() => {
                setIsMenuOpen("Contact Us");
                toggleMenu();
              }}
            >
              Contact Us
            </Link>
            <Link
              to={"/Register"}
              className="cursor-pointer text-gray-500 text-sm"
              onClick={() => setIsMenuOpen("")}
            >
              Register
            </Link>
            <Link
              to={"/SignIn"}
              className="cursor-pointer text-gray-500 text-sm"
              onClick={() => setIsMenuOpen("")}
            >
              Login
            </Link>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Navbar;
