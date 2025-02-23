const express = require("express");
const Income = require("../../database/schemas/Income.js");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// ✅ Add Income (Only for Logged-in Users)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    if (!title || !amount || !category || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newIncome = new Income({
      userId: req.userId, // Associate income with logged-in user
      title,
      amount,
      category,
      date,
    });

    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    console.error("Error adding income:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// ✅ Get Income (Only Logged-in User's Data)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const incomeData = await Income.find({ userId: req.userId }); // Fetch only this user's income
    res.json(incomeData);
  } catch (error) {
    console.error("Error fetching income:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
