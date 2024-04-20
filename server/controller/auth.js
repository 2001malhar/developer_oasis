const User = require("../models/users")
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config();


router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  const alphanumericRegex = /^[a-zA-Z0-9]+$/;

  if (!alphanumericRegex.test(username)) {
    return res.status(400).json({ error: "Username must contain at least one alphanumeric character" });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ newUser, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate new token
    const token = jwt.sign({ username: user.username, id: user.id, email: user.email }, process.env.SECRET, {
      expiresIn: "48h",
    });
    // save in session
    req.session.token = token;
    // send token in response
    res.status(200).json({ token, message: "Login Successful" });


  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;

