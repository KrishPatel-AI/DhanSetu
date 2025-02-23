const express = require("express");
const router = express.Router();
import Income from "../../database/schemas/Income"; // Adjust path correctly
const { authenticateUser } = require("../middleware/authMiddleware"); // Import authentication middleware

// Fetch all income for the logged-in user
router.get("/", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from auth
    const income = await Income.find({ userId });
    res.json(income);
  } catch (error) {
    console.error("Error fetching income:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add new income
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    const userId = req.user.id; // Ensure income is linked to the user
    const newIncome = new Income({ title, amount, category, date, userId });
    await newIncome.save();
    res.json(newIncome);
  } catch (error) {
    res.status(500).json({ message: "Error adding income" });
  }
})

module.exports = router;
