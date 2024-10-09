import React, { useState } from "react";
import axios from "axios";

const WorkoutDatabase = () => {
  const [isExercise, setIsExercise] = useState("");
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleSelectChange = (event) => {
    setIsExercise(event.target.value); // Update state with selected value
  };

  const handleSearch = async () => {
    if (!isExercise) return; // Prevent searching if no muscle group is selected

    setIsLoading(true); // Set loading to true
    const options = {
      method: "GET",
      url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${isExercise}`,
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
      },
    };

    try {
      const response = await axios.request(options);
      setExercises(response.data);
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center min-h-[60vh] gap-10 my-12">
      <div className="w-full flex flex-col justify-center items-center gap-6">
        <h1 className="text-5xl font-bold text-center">
          Search For A Perfect Exercise
        </h1>
        <div className="flex gap-4 items-center justify-center">
          <select
            value={isExercise}
            onChange={handleSelectChange}
            className="py-3 px-5 appearance-none border border-gray-400 rounded-md text-xl focus:border-gray-400"
          >
            <option value="">Select a Muscle Group</option>
            <option value="back">Back</option>
            <option value="cardio">Cardio</option>
            <option value="chest">Chest</option>
            <option value="lower%20arms">Lower Arms</option>
            <option value="lower%20legs">Lower Legs</option>
            <option value="neck">Neck</option>
            <option value="shoulders">Shoulders</option>
            <option value="upper%20arms">Upper Arms</option>
            <option value="upper%20legs">Upper Legs</option>
            <option value="waist">Waist</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-green-600 rounded-md py-3 px-4 text-xl text-white hover:bg-green-500"
          >
            Search
          </button>
        </div>
        {/* Loading indicator */}
        {isLoading ? (
          <p>Loading exercises...</p>
        ) : exercises.length === 0 ? (
          <p>Exercises and demonstrations will be displayed here.</p>
        ) : null}
      </div>
      <div className="w-full">
        {exercises && (
          <div className="flex w-full flex-wrap items-center justify-center text-center whitespace-nowrap gap-6">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex flex-col items-center text-center pt-10 rounded-xl gap-4 bg-gray-200 w-72 min-h-96"
              >
                <img
                  src={exercise?.gifUrl}
                  alt={exercise.name}
                  className="max-h-64"
                />
                <h3 className="text-wrap capitalize w-[80%] font-semibold">
                  {exercise?.name}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutDatabase;
