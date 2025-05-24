import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IExpensesPost } from "../interface/IExpenses";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

const AddExpenses: React.FC = () => {
  const [form, setForm] = useState<IExpensesPost>({
    title: "",
    amount: 0,
    category: "",
    note: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.amount || !form.category) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      await apiClient.post("/expenses", form);
      toast.success("Expense added successfully!");
      navigate("/page/myexpenses");
    } catch (error) {
      console.error("Failed to add expense:", error);
      toast.error("Failed to add expense. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6 flex items-center justify-center">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
        >
          ← Back
        </button>

        {/* Add Expense Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Add Your Expense
          </h2>

          <div className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="number"
              name="amount"
              placeholder="Amount (₱)"
              value={form.amount}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              required
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="mb-4">
            <textarea
              name="note"
              placeholder="Note (optional)"
              value={form.note}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenses;
