// components/NavLink.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, children, onClick, className }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <span
      className={`${
        isActive
          ? "text-white bg-blue-600 px-2 py-2 flex  font-bold "
          : "hover:text-blue-600 px-2 flex py-2  "
      } ${className}`}
    >
      <Link
        to={to}
        onClick={onClick}
        className="hover:scale-100 scale-95 text-xl text-center flex w-full md:text-left"
      >
        {children}
      </Link>
    </span>
  );
};

export default NavLink;


