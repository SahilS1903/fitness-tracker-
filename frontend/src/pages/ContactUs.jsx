import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/contact", formData);
      setFormData({ name: "", email: "", message: "" });
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("There was an error sending your message. Please try again later.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.5, 
        when: "beforeChildren", 
        staggerChildren: 0.2 
      } 
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      } 
    },
  };

  return (
    <motion.div
      className="bg-gray-100 min-h-screen py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-700"
          variants={cardVariants}
        >
          Contact Us
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-blue-600">Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-blue-600">Contact Information</h2>
            <div className="space-y-6">
              <motion.div 
                className="flex items-center"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaEnvelope className="text-orange-500 mr-4" size={24} />
                <span>ftracker60@gmail.com</span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaPhone className="text-orange-500 mr-4" size={24} />
                <span>+91 8806353010</span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaMapMarkerAlt className="text-orange-500 mr-4" size={24} />
                <span>123 Fitness Street, Healthy City, 12345</span>
              </motion.div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Business Hours</h3>
              <ul className="space-y-2">
                <li>Monday - Friday: 9:00 AM - 8:00 PM</li>
                <li>Saturday: 10:00 AM - 6:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Get In Touch With Us</h3>
              <div className="flex space-x-4">
                <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-blue-600">
                  <FaFacebookF size={24} />
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-blue-400">
                  <FaTwitter size={24} />
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-pink-600">
                  <FaInstagram size={24} />
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-blue-800">
                  <FaLinkedinIn size={24} />
                </motion.a>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Quick Response</h3>
              <p>We aim to respond to all inquiries within 24 hours. For urgent matters, please call us directly.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactUs;