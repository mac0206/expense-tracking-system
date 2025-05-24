import express from "express";
import {
  getExpenses,
  getSingleExpense,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expensecontroller.js";
import auth from "../Middleware/authMiddleware.js"; // 👈 import auth

const router = express.Router();

// 👇 apply auth to all routes
router.use(auth);

router.get("/", getExpenses);
router.get("/:id", getSingleExpense);
router.post("/", addExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
