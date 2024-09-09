const express = require("express");
const {
  registerUser,
  loginUser,
  verifyEmail, // Ensure this function is imported
} = require("../controllers/userController");


const router = express.Router();



router.get("/verify-email/:token", verifyEmail);
// Register route (with email verification)
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Email verification route


module.exports = router;
