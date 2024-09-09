const verificationEmail = (name, token) => `
  <html>
    <body>
      <h1>Hello ${name},</h1>
      <p>Thank you for registering. Please verify your email by clicking the link below:</p>
      <a href="${process.env.CLIENT_URL}/verify-email/${encodeURIComponent(
  token
)}">Verify your email</a>

      <p>If you did not create an account, please ignore this email.</p>
    </body>
  </html>
`;

module.exports = verificationEmail;
