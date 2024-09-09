const Workout = require("../models/Workout");

const addWorkout = async (req, res) => {
  const { type, duration, caloriesBurned } = req.body;

  try {
    const workout = new Workout({
      user: req.user.id,
      type,
      duration,
      caloriesBurned,
    });

    const createdWorkout = await workout.save();
    res.status(201).json(createdWorkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addWorkout,
  getWorkouts,
};
