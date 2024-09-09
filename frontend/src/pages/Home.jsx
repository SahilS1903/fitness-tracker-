import React from "react";
import { Route, Routes } from "react-router-dom";
import Features from "./Features";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Main from "./Main";
import SignIn from "./SignIn";
import Register from "./Register";

const Home = () => {
  return (
    <div className=" min-h-[90vh] relative">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Features" element={<Features />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default Home;
