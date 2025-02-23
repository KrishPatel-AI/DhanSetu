const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true // ✅ Ensures income is always associated with a user
  },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true } // ✅ Store date as a `Date` object instead of a string
}, { timestamps: true }); // ✅ Automatically adds `createdAt` & `updatedAt` fields

module.exports = mongoose.model("Income", IncomeSchema);
