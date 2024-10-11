import React, { useState } from "react";
import axios from "axios";

const NutritionChecker = () => {
  const [isFoodItem, setIsFoodItem] = useState("");
  const [nutritionResult, setNutritionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleInputChange = (event) => {
    setIsFoodItem(event.target.value); // Update state with input value
  };

  const handleSearch = async () => { // 
    if (!isFoodItem.trim()) return; // Prevent search if input is empty
    setIsLoading(true); // Set loading to true
    setError(null); // Reset error state

    try {
      const response = await axios.get(
        `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(
          isFoodItem
        )}`,
        {
          headers: {
            "X-Api-Key": import.meta.env.VITE_NUTRITION_RAPID_API_HOST,
          },
        }
      );

      const data = response.data;

      if (data.items.length > 0) {
        setNutritionResult(data.items[0]); // Set the first item from the result
      } else {
        setNutritionResult(null);
        setError("No nutrition information found for that food item.");
      }
    } catch (error) {
      console.error("Error fetching nutrition information:", error);
      setError("Error fetching nutrition information. Please try again later.");
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center min-h-[60vh] gap-10 my-12">
      <div className="w-full flex flex-col justify-center items-center gap-6">
        <h1 className="text-2xl md:text-5xl font-bold text-center">
          Nutrition Information Search
        </h1>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <input
            type="text"
            placeholder="Enter food item"
            value={isFoodItem}
            onChange={handleInputChange}
            className="py-2 px-4 appearance-none border border-gray-400 rounded-md md:text-xl text-base focus:border-gray-400"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 rounded-md py-2 px-4 text-base md:text-xl text-white hover:bg-green-500"
          >
            Search
          </button>
        </div>
        {/* Loading indicator */}
        {isLoading && <p>Loading nutrition information...</p>}
        {/* Error message */}
        {error && <p className="text-red-600">{error}</p>}
      </div>

      {/* Nutrition Table with Horizontal Scroll */}
      {nutritionResult && (
        <div className="w-full overflow-x-auto  xl:flex md:items-center md:justify-center ">
          <table className="table-auto border-collapse border  border-gray-300 min-w-[600px]">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Serving Size</th>
                <th className="border px-4 py-2">Calories</th>
                <th className="border px-4 py-2">Total Fat</th>
                <th className="border px-4 py-2">Saturated Fat</th>
                <th className="border px-4 py-2">Cholesterol</th>
                <th className="border px-4 py-2">Sodium</th>
                <th className="border px-4 py-2">Carbohydrates</th>
                <th className="border px-4 py-2">Fiber</th>
                <th className="border px-4 py-2">Sugar</th>
                <th className="border px-4 py-2">Protein</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">
                  {nutritionResult.name || "N/A"}
                </td>
                <td className="border px-4 py-2">100g</td>
                <td className="border px-4 py-2">
                  {nutritionResult.calories || "N/A"}
                </td>
                <td className="border px-4 py-2">
                  {`${nutritionResult.fat_total_g}g` || "N/A"}
                </td>
                <td className="border px-4 py-2">
                  {`${nutritionResult.fat_saturated_g}g` || "N/A"}
                </td>
                <td className="border px-4 py-2">
                  {`${nutritionResult.cholesterol_mg}mg` || "N/A"}
                </td>
                <td className="border px-4 py-2">
                  {`${nutritionResult.sodium_mg}mg` || "N/A"}
                </td>
                <td className="border px-4 py-2">
                  {`${nutritionResult.carbohydrates_total_g}g` || "N/A"}
                </td>
                <td className="border px-4 py-2">
                  {`${nutritionResult.fiber_g}g` || "N/A"}
                </td>
                <td className="border px-4 py-2">
                  {`${nutritionResult.sugar_g}g` || "N/A"}
                </td>
                <td className="border px-4 py-2">
                  {`${nutritionResult.protein_g}g` || "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NutritionChecker;
