import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("api/users/login", {
        email,
        password,
      });
      console.log("Sign in successful:", response.data);

      // You can store the token here
      localStorage.setItem("jwtToken", response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error.response?.data || error.message);
    }
  };

  return (
    <div className=" flex flex-col xl:flex-row animate-fadeIn justify-center xl:justify-normal bg-black w-full md:w-[80%] h-[60vh]  sm:h-[80vh] bg-cover bg-center bg-[url('loginbg1.jpg')] items-center m-auto mt-24 sm:mt-10 rounded-3xl">
      <div className="text-white   md:h-[70%] h-full  md:w-[50%] w-full flex  bg-[rgba(0,0,0,0.25)] mx-8  rounded-[2.5rem] items-center justify-center flex-col gap-4 p-8">
        <h2 className="  text-5xl xl:text-7xl  font-semibold">Sign In</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full justify-center items-center  gap-6 mt-8"
        >
          <div className="">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="p-6  bg-slate-900 py-3 text-2xl border-white border md:w-[25vw]  w-[60vw]  hover:border-orange-400 rounded-full"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="p-6  bg-slate-900 py-3 text-2xl border-white border md:w-[25vw]  w-[60vw]  hover:border-orange-400 rounded-full"
              required
            />
          </div>
          <button
            className="p-3 text-2xl bg-slate-900 py-3 border-white border hover:border-orange-400 md:w-[15vw]  w-[30    vw] mt-12 m-auto rounded-full"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
