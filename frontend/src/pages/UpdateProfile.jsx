import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faCamera, faWeight } from "@fortawesome/free-solid-svg-icons";

const UpdateProfile = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    height: "",
    weight: "",
    gender: "",
    age: "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        name: user.name || "",
        email: user.email || "",
        height: user.height || "",
        weight: user.weight || "",
        gender: user.gender || "",
        age: user.age || "",
      });
      setPreviewImage(user.profileImage || null);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      }

      

      const response = await axios.put(
        "/api/users/update-profile",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwttoken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

       // Log the response

      login(localStorage.getItem("jwttoken")); // Update the user context
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error updating profile");
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const slideIn = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const inputClasses = "mt-1 block w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 ease-in-out hover:border-gray-300 hover:bg-white";

  // Calculate BMI if height and weight are available
  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightInMeters = formData.height / 100;
      const bmi = (formData.weight / (heightInMeters * heightInMeters)).toFixed(1);
      return bmi;
    }
    return null;
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { category: "Normal", color: "text-green-600" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-600" };
    return { category: "Obese", color: "text-red-600" };
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 py-8"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div 
          variants={slideIn} 
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="relative">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent mb-4">
              Update Profile
            </h2>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-orange-400/20 rounded-full blur-3xl -z-10"></div>
          </div>
          <p className="text-gray-600 text-xl font-medium">Customize your fitness journey and track your progress</p>
          
          {/* Quick Stats Cards */}
          {user && (user.height || user.weight || user.age) && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 max-w-2xl mx-auto">
              {user.height && (
                <motion.div 
                  className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6 rounded-2xl border border-blue-300/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-blue-700 mb-1">{user.height}</div>
                  <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Height (cm)</div>
                  <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                </motion.div>
              )}
              {user.weight && (
                <motion.div 
                  className="bg-gradient-to-br from-green-50 via-green-100 to-green-200 p-6 rounded-2xl border border-green-300/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-green-700 mb-1">{user.weight}</div>
                  <div className="text-sm font-semibold text-green-600 uppercase tracking-wide">Weight (kg)</div>
                  <div className="mt-2 w-full bg-green-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </motion.div>
              )}
              {user.age && (
                <motion.div 
                  className="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 p-6 rounded-2xl border border-orange-300/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-orange-700 mb-1">{user.age}</div>
                  <div className="text-sm font-semibold text-orange-600 uppercase tracking-wide">Age (years)</div>
                  <div className="mt-2 w-full bg-orange-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        <motion.form 
          className="space-y-8" 
          onSubmit={handleSubmit}
          variants={fadeIn}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* Profile Image Section */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
            variants={slideIn} 
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                <FontAwesomeIcon icon={faCamera} className="text-orange-600 text-sm" />
              </div>
              Profile Picture
            </h3>
            <div className="flex items-center space-x-6">
              <div className="relative">
                {previewImage ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="relative"
                  >
                    <img
                      src={previewImage}
                      alt="Profile Preview"
                      className="w-24 h-24 object-cover rounded-full border-4 border-orange-200 shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.div>
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-gray-300 flex items-center justify-center">
                    <FontAwesomeIcon icon={faUser} className="text-gray-400 text-2xl" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-2">
                  Choose new image
                </label>
                <input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 file:cursor-pointer transition duration-200"
                />
              </div>
            </div>
          </motion.div>

          {/* Personal Information */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
            variants={slideIn} 
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <FontAwesomeIcon icon={faUser} className="text-blue-600 text-sm" />
              </div>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Name input */}
                <motion.div variants={slideIn} transition={{ delay: 0.7, duration: 0.5 }}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className={inputClasses}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </motion.div>

                {/* Email input (disabled) */}
                <motion.div variants={slideIn} transition={{ delay: 0.8, duration: 0.5 }}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={`${inputClasses} bg-gray-100 cursor-not-allowed`}
                    value={formData.email}
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </motion.div>
            </div>
          </motion.div>

          {/* Physical Stats */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
            variants={slideIn} 
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <FontAwesomeIcon icon={faWeight} className="text-green-600 text-sm" />
              </div>
              Physical Stats
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Height input */}
                <motion.div variants={slideIn} transition={{ delay: 1.0, duration: 0.5 }}>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                    Height (cm)
                  </label>
                  <input
                    id="height"
                    name="height"
                    type="number"
                    className={inputClasses}
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="170"
                  />
                </motion.div>

                {/* Weight input */}
                <motion.div variants={slideIn} transition={{ delay: 1.1, duration: 0.5 }}>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    className={inputClasses}
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="70"
                  />
                </motion.div>

                {/* Gender select */}
                <motion.div variants={slideIn} transition={{ delay: 1.2, duration: 0.5 }}>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className={inputClasses}
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>

                {/* Age input */}
                <motion.div variants={slideIn} transition={{ delay: 1.3, duration: 0.5 }}>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    className={inputClasses}
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="25"
                  />
                </motion.div>
            </div>
            
            {/* BMI Calculator */}
            {calculateBMI() && (
              <motion.div 
                variants={slideIn} 
                transition={{ delay: 1.4, duration: 0.5 }}
                className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200"
              >
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-purple-800 mb-2">Your BMI</h4>
                  <div className="text-3xl font-bold text-purple-600 mb-1">{calculateBMI()}</div>
                  <div className={`text-sm font-medium ${getBMICategory(calculateBMI()).color}`}>
                    {getBMICategory(calculateBMI()).category}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Security Settings */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
            variants={slideIn} 
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <FontAwesomeIcon icon={faLock} className="text-red-600 text-sm" />
              </div>
              Security Settings
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Password input */}
                <motion.div variants={slideIn} transition={{ delay: 1.5, duration: 0.5 }}>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password (optional)
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={inputClasses}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                  />
                </motion.div>

                {/* Confirm Password input */}
                <motion.div variants={slideIn} transition={{ delay: 1.6, duration: 0.5 }}>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className={inputClasses}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                  />
                </motion.div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div 
            className="flex justify-center gap-4"
            variants={fadeIn} 
            transition={{ delay: 1.7, duration: 0.5 }}
          >
            <motion.button
              type="submit"
              className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-orange-500 text-white font-bold py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-white/20 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transition-all duration-300 transform hover:scale-105 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #f97316 100%)',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-800 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <span className="relative flex items-center text-white font-bold text-lg tracking-wide">
                <svg className="mr-3 w-6 h-6 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                Update Profile
                <svg className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              
              {/* Shine effect */}
              <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default UpdateProfile;