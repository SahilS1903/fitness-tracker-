import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Features from "./Features";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Main from "./Main";
import SignIn from "./SignIn";
import Register from "./Register";
import VerifyEmail from "./VerifyEmail"; // Import the VerifyEmail component
import { useAuth } from "../context/AuthContext"; // Use the auth context

const Home = () => {
  const { isAuthenticated } = useAuth(); // Get the authentication status

  return (
    <div className="min-h-[90vh] relative">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Features" element={<Features />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        {/* If user is logged in, redirect to home when accessing SignIn/Register */}
        <Route
          path="/SignIn"
          element={isAuthenticated ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/Register"
          element={isAuthenticated ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />{" "}
        {/* Add the route for email verification */}
      </Routes>
    </div>
  );
};

export default Home;
