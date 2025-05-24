import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IExpensesGet } from "../interface/IExpenses";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

const ExpensesList = () => {
  const [expenses, setExpenses] = useState<IExpensesGet[]>([]);
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    try {
      const response = await apiClient.get("/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
      toast.error("Failed to load expenses");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/expenses/${id}`);
      setExpenses(expenses.filter((exp) => exp._id !== id));
      toast.success("Expense deleted successfully");
    } catch (error) {
      toast.error("Failed to delete expense");
    }
  };

  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchExpenses();
    if (!username) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="max-w-4xl mx-auto px-6 py-8 bg-white rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">My Expenses</h2>
          <Link
            to="/page/addexpenses"
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            + Add Expense
          </Link>
        </div>

        {/* No Expenses Case */}
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center py-6 text-lg">
            No expenses added yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {/* Mapping expenses */}
            {expenses.map((expense) => (
              <li
                key={expense._id}
                className="border border-gray-200 rounded-lg p-5 bg-white shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {expense.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Category:{" "}
                      <span className="font-medium text-blue-600">
                        {expense.category}
                      </span>
                    </p>
                    {expense.note && (
                      <p className="text-sm text-gray-500 mt-1 italic">
                        Note: {expense.note}
                      </p>
                    )}
                  </div>
                  <div className="text-lg font-semibold text-green-600">
                    ₱{expense.amount?.toFixed(2)}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-3">
                  <button
                    onClick={() =>
                      navigate(`/page/editexpenses/${expense._id}`)
                    }
                    className="text-sm px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-white transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(expense._id)}
                    className="text-sm px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpensesList;
