import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

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

  const inputClasses = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out";

  return (
    <motion.div 
      className="min-h-screen bg-gray-100  px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={slideIn} transition={{ delay: 0.2, duration: 0.5 }}>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900 mb-12">
            Update Your Profile
          </h2>
        </motion.div>
        <motion.form 
          className="mt-8 space-y-6" 
          onSubmit={handleSubmit}
          variants={fadeIn}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Name input */}
                <motion.div variants={slideIn} transition={{ delay: 0.6, duration: 0.5 }}>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className={inputClasses}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </motion.div>

                {/* Email input (disabled) */}
                <motion.div variants={slideIn} transition={{ delay: 0.7, duration: 0.5 }}>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={`${inputClasses} bg-gray-100`}
                    value={formData.email}
                    disabled
                  />
                </motion.div>

                {/* Profile Image input */}
                <motion.div variants={slideIn} transition={{ delay: 0.8, duration: 0.5 }}>
                  <label htmlFor="profileImage" className="block text-lg font-medium text-gray-700 mb-2">
                    Profile Image
                  </label>
                  <div className="mt-1 flex items-center">
                    {previewImage && (
                      <motion.img
                        src={previewImage}
                        alt="Profile Preview"
                        className="w-16 h-16 object-cover rounded-full mr-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      />
                    )}
                    <input
                      id="profileImage"
                      name="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                </motion.div>

                {/* Height input */}
                <motion.div variants={slideIn} transition={{ delay: 0.9, duration: 0.5 }}>
                  <label htmlFor="height" className="block text-lg font-medium text-gray-700 mb-2">
                    Height (cm)
                  </label>
                  <input
                    id="height"
                    name="height"
                    type="number"
                    className={inputClasses}
                    value={formData.height}
                    onChange={handleChange}
                  />
                </motion.div>

                {/* Weight input */}
                <motion.div variants={slideIn} transition={{ delay: 1, duration: 0.5 }}>
                  <label htmlFor="weight" className="block text-lg font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    className={inputClasses}
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </motion.div>

                {/* Gender select */}
                <motion.div variants={slideIn} transition={{ delay: 1.1, duration: 0.5 }}>
                  <label htmlFor="gender" className="block text-lg font-medium text-gray-700 mb-2">
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
                <motion.div variants={slideIn} transition={{ delay: 1.2, duration: 0.5 }}>
                  <label htmlFor="age" className="block text-lg font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    className={inputClasses}
                    value={formData.age}
                    onChange={handleChange}
                  />
                </motion.div>

                {/* Password input */}
                <motion.div variants={slideIn} transition={{ delay: 1.3, duration: 0.5 }}>
                  <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
                    New Password (optional)
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={inputClasses}
                    value={formData.password}
                    onChange={handleChange}
                  />
                </motion.div>

                {/* Confirm Password input */}
                <motion.div variants={slideIn} transition={{ delay: 1.4, duration: 0.5 }}>
                  <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className={inputClasses}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </motion.div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <motion.div 
                variants={fadeIn} 
                transition={{ delay: 1.5, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  type="submit"
                  className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                  Update Profile
                </button>
              </motion.div>
            </div>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default UpdateProfile;