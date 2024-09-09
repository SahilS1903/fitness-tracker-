require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail", // Replace with your email service provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: "test@example.com", // Replace with your email
  subject: "Test Email",
  text: "This is a test email",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending test email:", error);
  } else {
    console.log("Test email sent:", info.response);
  }
});
