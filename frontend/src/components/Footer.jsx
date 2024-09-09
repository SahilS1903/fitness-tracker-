import React from "react";

import Logo from "../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="footer flex justify-center gap-1 items-center text-[#d9d9d9] bg-[#323232] h-14 p-4">
      <div className=" flex justify-center gap-1 items-center w-[80%] scale-50 sm:scale-75 md:scale-90 lg:scale-100">
        <img src={Logo} className="w-16" alt="ShapeUp Logo" />
        <p className="text-2xl text-nowrap ">
          Copyright 2024 ShapeUp.com - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
