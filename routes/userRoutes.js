const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  registerUser,
  loginUser,
  verifyEmail,
  getUserById, // Ensure this function is imported
  updateProfile,
  contactUs
} = require("../controllers/userController");

const router = express.Router();

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Register route (with email verification)
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Email verification route
router.get("/verify-email/:token", verifyEmail);

router.get("/:id", getUserById);

// Update profile route with file upload
router.put("/update-profile", upload.single('profileImage'), updateProfile);

router.post("/contact", contactUs);

module.exports = router;
