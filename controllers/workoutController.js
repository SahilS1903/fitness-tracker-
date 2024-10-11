const Workout = require("../models/Workout");

const addWorkout = async (req, res) => {
  const { exercise, sets, repsPerSet, weightPerSet, muscleGroup } = req.body;
  const userId = req.user.id;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    // console.log('Received workout data:', { exercise, sets, repsPerSet, weightPerSet, muscleGroup, userId });

    // Check if there's an existing workout for the same exercise today
    const existingWorkout = await Workout.findOne({
      user: userId,
      exercise,
      date: { $gte: today }
    });

    if (existingWorkout) {
      // Update existing workout
      existingWorkout.sets += parseInt(sets);
      existingWorkout.repsPerSet = existingWorkout.repsPerSet.concat(repsPerSet.map(rep => parseInt(rep)));
      existingWorkout.weightPerSet = existingWorkout.weightPerSet.concat(weightPerSet.map(weight => parseFloat(weight)));
      const updatedWorkout = await existingWorkout.save();
      res.status(200).json(updatedWorkout);
    } else {
      // Create new workout
      const workout = new Workout({
        user: userId,
        exercise,
        sets: parseInt(sets),
        repsPerSet: repsPerSet.map(rep => parseInt(rep)),
        weightPerSet: weightPerSet.map(weight => parseFloat(weight)),
        muscleGroup,
        date: new Date()
      });
      const createdWorkout = await workout.save();
      res.status(201).json(createdWorkout);
    }
  } catch (error) {
    console.error('Error adding workout:', error);
    res.status(500).json({ message: error.message });
  }
};

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).sort({ date: -1 });
    const formattedWorkouts = workouts.map(workout => ({
      ...workout.toObject(),
      totalReps: workout.repsPerSet.reduce((sum, reps) => sum + reps, 0)
    }));
    res.json(formattedWorkouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWorkoutAnalytics = async (req, res) => {
  const { exercise } = req.query;
  const userId = req.user.id;

  try {
    const workouts = await Workout.find({ user: userId, exercise }).sort({ date: 1 });
    
    const analytics = workouts.map(w => ({
      date: w.date.toISOString().split('T')[0],
      sets: w.sets,
      repsPerSet: w.repsPerSet,
      weightPerSet: w.weightPerSet,
    }));

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addWorkout,
  getWorkouts,
  getWorkoutAnalytics,
};