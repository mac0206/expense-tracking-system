import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    default: "General",
  },
  note: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // ensures every expense is linked to a user
  },
});

// Avoid model overwrite error in development
const Expense =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

export default Expense;
