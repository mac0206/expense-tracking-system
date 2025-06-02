import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";

interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  note?: string;
  date?: string;
}

const Home = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }

    const justLoggedIn = localStorage.getItem("justLoggedIn");
    if (justLoggedIn === "true") {
      setShowPopup(true);
      localStorage.removeItem("justLoggedIn"); // Show only once
    } else {
      fetchExpenses(); // Fetch immediately if not just logged in
    }
  }, [navigate, username]);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/expenses");
      setExpenses(response.data || []);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch expenses", err);
      setError("Failed to load expenses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const expenseCount = expenses.length;

  const handleProceed = () => {
    setShowPopup(false);
    fetchExpenses(); // Only fetch after proceeding from welcome popup
  };

  if (showPopup) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center animate-fade-in">
          <h1 className="text-3xl font-bold mb-4">Welcome {username}!</h1>
          <p className="text-gray-700 mb-6">
            Manage your daily expenses easily.
          </p>
          <button
            onClick={handleProceed}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Proceed
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      <Dashboard
        totalExpenses={totalExpenses}
        expenseCount={expenseCount}
        recentExpenses={expenses.slice(0, 5)}
        allExpenses={expenses}
      />
    </div>
  );
};

export default Home;
