import { useState, useEffect } from "react";
import axios from "axios";
import { IExpensesGet, IExpensesPost } from "./interface/IExpenses";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState<IExpensesPost>();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");

  // Fetch all expenses
  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/expenses");
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Handle form submit (add or update)
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await axios.put(`http://localhost:4000/api/expenses/${editId}`, form);
      } else {
        await axios.post("http://localhost:4000/api/expenses", form);
      }

      setIsEditing(false);
      setEditId("");
      fetchExpenses();
    } catch (err) {
      console.error("Error submitting expense:", err);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  // Handle edit
  const handleEdit = (expense: IExpensesGet) => {
    setForm({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      note: expense.note,
    });
    setIsEditing(true);
    setEditId(expense._id);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Expense Tracker
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border rounded p-2 shadow-sm"
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="border rounded p-2 shadow-sm"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border rounded p-2 shadow-sm"
        />
        <input
          type="text"
          placeholder="Note"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          className="border rounded p-2 shadow-sm"
        />
        <button
          type="submit"
          className="col-span-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
        >
          {isEditing ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      <div className="space-y-4">
        {expenses.map((exp) => (
          <div
            key={exp._id}
            className="border p-4 rounded-md shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div>
              <h2 className="font-semibold text-lg">{exp.title}</h2>
              <p className="text-sm text-gray-500">${exp.amount}</p>
              <p className="text-sm text-gray-400">
                {exp.category} • {exp.note}
              </p>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                onClick={() => handleEdit(exp)}
                className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(exp._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
