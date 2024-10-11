const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  exercise: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  repsPerSet: {
    type: [Number],
    required: true,
  },
  muscleGroup: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  weightPerSet: {
    type: [Number],
    required: true,
  },
});

module.exports = mongoose.model("Workout", workoutSchema);