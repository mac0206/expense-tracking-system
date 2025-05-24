import React from "react";

interface DashboardProps {
  totalExpenses: number;
  expenseCount: number;
  recentExpenses: {
    _id: string;
    title: string;
    amount: number;
    category: string;
  }[];
}

const Dashboard: React.FC<DashboardProps> = ({
  totalExpenses,
  expenseCount,
  recentExpenses,
}) => {
  // Extract unique categories from recentExpenses
  const uniqueCategories = Array.from(
    new Set(recentExpenses.map((e) => e.category))
  );

  return (
    <div className="max-w-4xl w-full mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-600 text-white rounded-lg p-5 shadow-md flex flex-col items-center">
          <p className="text-sm uppercase font-semibold">Total Expenses</p>
          <p className="text-3xl font-bold mt-2">₱{totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-green-600 text-white rounded-lg p-5 shadow-md flex flex-col items-center">
          <p className="text-sm uppercase font-semibold">Number of Expenses</p>
          <p className="text-3xl font-bold mt-2">{expenseCount}</p>
        </div>
        <div className="bg-purple-600 text-white rounded-lg p-5 shadow-md flex flex-col items-center">
          <p className="text-sm uppercase font-semibold">Categories Tracked</p>
          <p className="text-3xl font-bold mt-2">{uniqueCategories.length}</p>
        </div>
      </div>

      {/* Recent Expenses List */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Recent Expenses
        </h3>
        {recentExpenses.length === 0 ? (
          <p className="text-gray-500">No recent expenses found.</p>
        ) : (
          <ul className="space-y-4">
            {recentExpenses.map((expense) => (
              <li
                key={expense._id}
                className="flex justify-between items-center bg-gray-50 rounded-md p-4 shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">{expense.title}</p>
                  <p className="text-sm text-gray-600">{expense.category}</p>
                </div>
                <p className="font-semibold text-green-600">
                  ₱{expense.amount?.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
