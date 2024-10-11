import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Features from "./Features";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Main from "./Main";
import SignIn from "./SignIn";
import Register from "./Register";
import WorkoutDatabase from "./WorkoutDatabase";
import NutritionChecker from "./NutritionChecker";
import BmrCalculator from "./BmrCalculator";
import VerifyEmail from "./VerifyEmail";
import ProfileLayout from "./ProfileLayout"; // Layout for private routes
import MealPlan from "./MealPlan"; // Private Route Example
import WaterIntake from "./WaterIntake"; // Private Route Example
import PrivateRoute from "./PrivateRoute"; // Import the PrivateRoute component
import { useAuth } from "../context/AuthContext";
import UpdateProfile from "./UpdateProfile";
import WorkoutDetails from "./WorkoutDetails";
const Home = () => {
  const { isAuthenticated } = useAuth(); // Get the authentication status

  return (
    <div className="min-h-[90vh] relative">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Main />} />
        <Route path="/Features" element={<Features />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/WorkoutDatabase" element={<WorkoutDatabase />} />
        <Route path="/NutritionChecker" element={<NutritionChecker />} />
        <Route path="/BmrCalculator" element={<BmrCalculator />} />
        

        {/* Auth Routes */}
        <Route
          path="/SignIn"
          element={isAuthenticated ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/Register"
          element={isAuthenticated ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        {/* Private Routes */}
        <Route path="/profile" element={<PrivateRoute />}>
          <Route element={<ProfileLayout />}>
            <Route path="update-profile" element={<UpdateProfile />} />
            <Route path="workout-details" element={<WorkoutDetails />} />
            <Route path="meal-plan" element={<MealPlan />} />
            <Route path="water-intake" element={<WaterIntake />} />
            {/* Add more private routes inside the Profile layout */}
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default Home;
