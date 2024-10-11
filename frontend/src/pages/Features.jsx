import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Footer from "../components/Footer";

const FeatureCard = ({ title, description, link }) => {
  return (
    <motion.div 
      className="bg-white text-center rounded-lg shadow-lg p-6 mb-6 flex flex-col items-center justify-between h-full hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div>
        <motion.h3 
          className="text-xl font-semibold text-center mt-3 mb-4 text-blue-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to={link}
          className="group flex items-center bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors duration-300"
        >
          Learn More
          <motion.span
            initial={{ x: 0 }}
            animate={{ x: 5 }}
            transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
          >
            <FaArrowRight className="ml-2" />
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      title: "Workout Database",
      description:
        "Our comprehensive workout database helps you find the perfect routine to target your specific goals.",
      link: "/WorkoutDatabase",
    },
    {
      title: "Nutrition Checker",
      description:
        "Easily check the nutritional value of any food, including calories, fat, protein, and carbohydrates.",
      link: "/NutritionChecker",
    },
    {
      title: "BMR Calculator",
      description:
        "Calculate your Basal Metabolic Rate (BMR) to determine your daily calorie needs and gain insights into your metabolism.",
      link: "/BmrCalculator",
    },
    {
      title: "Create Account",
      description:
        "Create a personalized account to access additional features, save your progress, and customize your experience.",
      link: "/Register",
    },
    {
      title: "Workout Analytics",
      description:
        "Visualize your fitness journey with detailed charts and graphs. Track your progress, identify trends, and optimize your workouts for better results.",
      link: "/profile/workout-details",
    },
    {
      title: "Update Profile",
      description:
        "Update your profile information to keep your account up to date.",
      link: "/profile/update-profile",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // New animation for the title letters
  const letterVariants = {
    hover: {
      scale: 1.3,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="bg-gray-100 min-h-screen py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-700"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Wrap each letter in a motion.span */}
          {"App Features".split('').map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              whileHover="hover"
              style={{ display: 'inline-block' }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                link={feature.link}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Features;
