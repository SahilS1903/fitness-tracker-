const express = require("express");
const { addWorkout, getWorkouts, getWorkoutAnalytics } = require("../controllers/workoutController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get('/analytics', protect, getWorkoutAnalytics);

router.route("/").post(protect, addWorkout).get(protect, getWorkouts);

module.exports = router;
