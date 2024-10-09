import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });

      // Navigate to the sign-in page and show a success message
      navigate("/SignIn");
      toast.success(
        "Registration successful. Please check your email to verify your account."
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.response?.data || error.message;
      toast.error(errorMessage);
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(/loginbg1.jpg)` }}
      className="flex flex-col xl:flex-row animate-fadeIn  justify-center xl:justify-normal bg-black w-full md:w-[80%] h-[100vh] mb-6 sm:mb-auto sm:h-[80vh] bg-cover bg-center bg-[url('loginbg1.jpg')] items-center m-auto mt-24 sm:mt-10 rounded-3xl"
    >
      <div className="text-white md:h-[90%] h-full md:w-[50%] w-full flex bg-[rgba(0,0,0,0.25)] mx-8 rounded-[2.5rem] items-center justify-center flex-col gap-4 sm:gap-4 p-8">
        <h2 className="text-5xl xl:text-7xl font-semibold">Register</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full justify-center items-center gap-6 mt-8"
        >
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="p-6 bg-slate-900 py-3 text-2xl border-white border md:w-[25vw] w-[60vw] hover:border-orange-400 rounded-full"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="p-6 bg-slate-900 py-3 text-2xl border-white border md:w-[25vw] w-[60vw] hover:border-orange-400 rounded-full"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="p-6 bg-slate-900 py-3 text-2xl border-white border md:w-[25vw] w-[60vw] hover:border-orange-400 rounded-full"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} size="lg" />
              ) : (
                <FontAwesomeIcon icon={faEye} size="lg" />
              )}
            </span>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="p-6 bg-slate-900 py-3 text-2xl border-white border md:w-[25vw] w-[60vw] hover:border-orange-400 rounded-full"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showConfirmPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} size="lg" />
              ) : (
                <FontAwesomeIcon icon={faEye} size="lg" />
              )}
            </span>
          </div>
          <button
            className="p-3 text-2xl bg-slate-900 py-3 border-white border hover:border-orange-400 md:w-[15vw] w-[30vw] mt-12 m-auto rounded-full"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
