// components/NavLink.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, children, onClick, className }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <span
      className={`cursor-pointer text-sm ${
        isActive ? "text-black border-b-2 border-black" : "text-gray-500"
      }`}
    >
      <Link
        to={to}
        onClick={onClick}
        className="hover:scale-100 scale-95 text-xl text-center md:text-left"
      >
        {children}
      </Link>
    </span>
  );
};

export default NavLink;
