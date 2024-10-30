import React from "react";

const Footer = () => {
  return (
    <footer className="footer flex justify-center gap-2 items-center text-[#d9d9d9] bg-[#323232] h-14 p-4">
      <div className=" flex justify-center gap-2 items-center w-[80%] scale-50 sm:scale-75 md:scale-90 lg:scale-100">
        <img
          src="/FitnessAppLogo.png"
          className="w-12 rounded-xl border border-white"
          alt="ShapeUp Logo"
        />
        <p className="text-2xl text-nowrap ">
          Copyright 2024 FitFusion.com - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
