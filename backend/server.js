import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Middleware
app.use(express.json());
app.use(cors({
  origin: "*", // Allow all origins (for development)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow common HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"] // Allow necessary headers
}));

// ✅ User Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

// ✅ Income Schema & Model (🚀 Added this)
const incomeSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  category: String,
  date: String,
});
const Income = mongoose.model("Income", incomeSchema);

// ✅ Register Route
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
});

// ✅ Login Route
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

// ✅ Add Income (Fixed 🚀)
app.post("/api/income", async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    if (!title || !amount || !category || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newIncome = new Income({ title, amount, category, date });
    await newIncome.save();
    
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Fetch Income Data (🚀 Added this)
app.get("/api/income", async (req, res) => {
  try {
    const incomes = await Income.find();
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Start Server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
