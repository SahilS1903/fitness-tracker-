import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavLink from "../components/NavLink1"; // Adjust the path based on your project structure

const ProfileLayout = () => {
  const [isActive, setIsActive] = useState("/profile/update-profile"); // Default active link

  return (
    <div className="flex flex-col md:flex-row mt-10 gap-4">
      {/* Sidebar for Profile Navigation */}
      <aside className="w-full md:w-72 h-24  bg-gray-200 border-2 border-blue-700 rounded-md">
        <ul className="flex flex-col  ">
          <NavLink to="/profile/update-profile" setIsActive={setIsActive}>
            Update Profile
          </NavLink>
          <NavLink to="/profile/workout-details" setIsActive={setIsActive}>
            Workout Details
          </NavLink>
          {/* <NavLink to="/profile/meal-plan" setIsActive={setIsActive}>
            Meal Plan
          </NavLink>
          <NavLink to="/profile/water-intake" setIsActive={setIsActive}>
            Water Intake
          </NavLink> */}
          {/* Add more links as needed */}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-grow ">
        <Outlet />
        {/* This will render the child components (MealPlan, WaterIntake, etc.) */}
      </main>
    </div>
  );
};

export default ProfileLayout;
