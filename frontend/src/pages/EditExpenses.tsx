import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IExpensesGet } from "../interface/IExpenses";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

const EditExpense = () => {
  const { id } = useParams<{ id: string }>(); // added generic type for clarity
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [expense, setExpense] = useState<IExpensesGet>({
    _id: "",
    title: "",
    amount: 0,
    category: "",
    note: "",
  });

  useEffect(() => {
    const fetchExpense = async () => {
      if (!id) {
        toast.error("No expense ID provided");
        setLoading(false);
        return;
      }
      try {
        const response = await apiClient.get(`/expenses/${id}`);
        setExpense(response.data);
      } catch (error) {
        console.error("Failed to load expense:", error);
        toast.error("Failed to load expense");
      } finally {
        setLoading(false);
      }
    };

    fetchExpense();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setExpense((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      toast.error("No expense ID to update");
      return;
    }
    try {
      await apiClient.put(`/expenses/${id}`, expense);
      toast.success("Expense updated successfully");
      navigate("/page/myexpenses");
    } catch (error) {
      console.error("Failed to update expense:", error);
      toast.error("Failed to update expense");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
        <p className="text-gray-700 text-lg">Loading expense...</p>
      </div>
    );
  }

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

        {/* Edit Expense Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Edit Expense
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={expense.title}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Amount (₱)</label>
            <input
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={expense.category}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none"
              required
            >
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Note</label>
            <textarea
              name="note"
              value={expense.note}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExpense;
