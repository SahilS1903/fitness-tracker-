import React from "react";
import { FaQuoteLeft, FaLinkedin, FaTwitter, FaRocket, FaHeart, FaUsers, FaBullseye } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Sahil Shah",
      role: "Founder & CEO",
      image: "https://via.placeholder.com/300",
      linkedin: "#",
      twitter: "#",
      description: "Passionate about transforming lives through fitness and technology."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users", icon: FaUsers, color: "blue" },
    { number: "50K+", label: "Workouts Completed", icon: FaBullseye, color: "green" },
    { number: "98%", label: "Success Rate", icon: FaRocket, color: "orange" },
    { number: "24/7", label: "Support Available", icon: FaHeart, color: "purple" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const slideIn = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          variants={slideIn} 
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent mb-4">
              About FitFusion
            </h1>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-orange-400/20 rounded-full blur-3xl -z-10"></div>
          </div>
          <p className="text-gray-600 text-xl font-medium max-w-3xl mx-auto">
            Empowering your fitness journey with cutting-edge technology and expert guidance
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={itemVariants}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {stats.map((stat, index) => {
            const colorClasses = {
              blue: "from-blue-50 via-blue-100 to-blue-200 border-blue-300/50 text-blue-700",
              green: "from-green-50 via-green-100 to-green-200 border-green-300/50 text-green-700",
              orange: "from-orange-50 via-orange-100 to-orange-200 border-orange-300/50 text-orange-700",
              purple: "from-purple-50 via-purple-100 to-purple-200 border-purple-300/50 text-purple-700"
            };
            
            return (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${colorClasses[stat.color]} p-6 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="text-2xl" />
                  <div className="text-3xl font-bold">{stat.number}</div>
                </div>
                <div className="text-sm font-semibold uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Our Story Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 mb-16"
          variants={slideIn}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
              <FaQuoteLeft className="text-orange-600 text-xl" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Story</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                FitFusion was founded in 2024 with a simple mission: to help people achieve their fitness goals and lead healthier lives. We believe that everyone deserves access to high-quality fitness resources and support, regardless of their current fitness level or background.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Our platform combines cutting-edge technology with expert knowledge to create a personalized fitness experience that adapts to your unique needs and goals.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-orange-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <FaRocket className="text-6xl text-blue-600 mb-4 mx-auto" />
                  <p className="text-gray-600 font-semibold">Innovation in Fitness</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          className="mb-16"
          variants={itemVariants}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Passionate professionals dedicated to helping you achieve your fitness goals
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="max-w-md">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-800">
                      {member.name}
                    </h3>
                    <div className="mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {member.role}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">{member.description}</p>
                    
                    <div className="flex justify-center space-x-4">
                      <motion.a
                        href={member.linkedin}
                        className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaLinkedin size={18} />
                      </motion.a>
                      <motion.a
                        href={member.twitter}
                        className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 hover:bg-orange-200 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaTwitter size={18} />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 mb-16"
          variants={slideIn}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <FaBullseye className="text-blue-600 text-xl" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Mission</h2>
          </div>
          
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-8">
            At FitFusion, we're committed to empowering individuals to take control of their health and fitness. Through our innovative platform, expert guidance, and supportive community, we aim to make fitness accessible, enjoyable, and sustainable for everyone.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Community</h3>
              <p className="text-gray-600">Building a supportive fitness community</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRocket className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Innovation</h3>
              <p className="text-gray-600">Cutting-edge fitness technology</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-orange-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Wellness</h3>
              <p className="text-gray-600">Holistic approach to health</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 text-white p-8 md:p-12 rounded-2xl shadow-xl text-center"
          variants={itemVariants}
          transition={{ delay: 0.7, duration: 0.5 }}
          style={{ 
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #f97316 100%)',
            minHeight: '300px'
          }}
        >
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-orange-500/90 rounded-2xl"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              Join Us on Your Fitness Journey
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-95">
              Whether you're just starting out or looking to take your fitness to the next level, FitFusion is here to support you every step of the way. Let's work together to achieve your goals and create lasting, healthy habits.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/register"
                className="relative overflow-hidden inline-flex items-center bg-white text-blue-600 font-bold px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center text-lg">
                  <FaRocket className="mr-3 transition-transform group-hover:scale-110" />
                  Get Started Today
                  <svg className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
