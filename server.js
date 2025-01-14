const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory user database (for simplicity)
const users = [];

// Signup endpoint
app.post("/api/signup", (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists." });
  }

  // Add new user
  users.push({ email, password });
  res.status(201).json({ message: "Signup successful!" });
});

// Login endpoint
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Check if user exists and password matches
  const user = users.find((user) => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  res.status(200).json({ message: "Login successful!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
