import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import expenseRoutes from "./routes/Expenses.js";
import authRoutes from "./routes/auth.js";

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/expenses", expenseRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
