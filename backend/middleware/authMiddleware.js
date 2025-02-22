import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// 📝 Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ❌ Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // ✅ Create and save user
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
});

// 🔑 Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ❌ Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // 🔐 Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // ✅ Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
