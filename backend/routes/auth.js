import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

// ✅ Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ❌ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 Hash the password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Save user in database
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    console.log("✅ User registered:", newUser);
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("❌ Error in registration:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

// 🔑 Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ❌ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 🔐 Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("✅ User logged in:", user);
    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    console.error("❌ Error in login:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

export default router;
