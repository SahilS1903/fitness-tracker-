const express = require("express");
const { addWorkout, getWorkouts } = require("../controllers/workoutController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, addWorkout).get(protect, getWorkouts);

module.exports = router;
