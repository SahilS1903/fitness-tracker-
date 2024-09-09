import React from "react";
import banner from "../assets/banner.png";
import banner2 from "../assets/banner2.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Main = () => {
  const { isAuthenticated } = useAuth(); // Get authentication state

  return (
    <div className="flex flex-col gap-10 w-[90%] m-auto">
      <div className="flex flex-col items-center md:flex-row gap-8 mt-10 ">
        <div className="flex flex-col items-start gap-4 animate-slideInFromLeft">
          <h1 className="text-5xl font-bold">Shape Up</h1>
          <p className="text-4xl font-semibold">
            We are here to help you achieve your fitness dreams.
          </p>
          <button className="bg-green-600 p-2 mt-2 text-white rounded-md">
            WHAT WE OFFER
          </button>
        </div>
        <div>
          <img className="animate-slideInFromRight" src={banner} alt="Banner" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col text-center gap-2 animate-fadeIn">
          <h2 className="text-3xl font-semibold">The Tools for Your Goals</h2>
          <p>
            Trying to lose weight, tone up, lower your BMI, or invest in your
            overall health? We give you the right features to get there.
          </p>
        </div>
        <div className="flex md:flex-row flex-col gap-4">
          <div className="flex flex-col gap-3 border animate-slideInFromLeft md:animate-scaleIn border-gray-500 p-3 rounded-md">
            <h3 className="text-xl font-semibold">Learn. Track. Improve.</h3>
            <p>
              Keeping a food diary helps you understand your habits and to hit
              your goals.
            </p>
          </div>
          <div className="flex flex-col gap-3 border animate-slideInFromRight md:animate-scaleIn border-gray-500 p-3 rounded-md">
            <h3 className="text-xl font-semibold">Logging Simplified.</h3>
            <p>
              Save meals and use Quick Tools for fast and easy food tracking.
            </p>
          </div>
          <div className="flex flex-col gap-3 border animate-slideInFromLeft md:animate-scaleIn border-gray-500 p-3 rounded-md">
            <h3 className="text-xl font-semibold">Stay Motivated.</h3>
            <p>
              Join the World's Largest Fitness Community for advice, tips, and
              support 24/7.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 items-center justify-center gap-8 mb-16">
        <div className="flex flex-col gap-4 animate-slideInFromLeft">
          <div className="flex flex-col gap-3">
            <h3 className="text-4xl font-semibold">
              Start your fitness journey today!
            </h3>
            <p>
              Sign up for Shape Up and get started on your path to a healthier
              lifestyle.
            </p>
          </div>
          {!isAuthenticated && (
            <div className="flex gap-2">
              <Link
                to="/Register"
                className="bg-green-600 p-2 text-white rounded-md"
              >
                Register
              </Link>
              <Link
                to="/SignIn"
                className="bg-white border border-blue-600 p-2 px-4 text-blue-600 rounded-md"
              >
                Login
              </Link>
            </div>
          )}
        </div>
        <div className="animate-slideInFromRight">
          <img src={banner2} className="" alt="Banner 2" />
        </div>
      </div>
    </div>
  );
};

export default Main;
