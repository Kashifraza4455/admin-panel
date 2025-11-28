import { useParams, Link } from "react-router-dom";
import { useUsers } from "../context/UsersContext";
import { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";

export default function UserFinancial() {
  const { id } = useParams();
  const { users } = useUsers();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = users.find((u) => u.id === parseInt(id));
    if (u) {
      setUser(u);
    }
  }, [id, users]);

  if (!user)
    return (
      <AdminLayout>
        <p className="p-4 lg:p-6 text-red-500 font-semibold text-center">
          User not found
        </p>
      </AdminLayout>
    );

  // Sample financial data
  const financialData = user.financialData || {
    initialBalance: 50000,
    currentBalance: 12500,
    totalSpent: 37500,
    transactions: [
      {
        id: 1,
        date: "2024-01-05",
        description: "Gaming Purchase - In-game currency",
        amount: 5000,
        type: "expense",
        category: "Gaming",
      },
      {
        id: 2,
        date: "2024-01-12",
        description: "Therapy Session",
        amount: 2000,
        type: "investment",
        category: "Recovery",
      },
      {
        id: 3,
        date: "2024-01-18",
        description: "Online Gaming Subscription",
        amount: 1500,
        type: "expense",
        category: "Gaming",
      },
      {
        id: 4,
        date: "2024-01-25",
        description: "Meditation App Subscription",
        amount: 800,
        type: "investment",
        category: "Recovery",
      },
      {
        id: 5,
        date: "2024-02-01",
        description: "Gaming Equipment",
        amount: 12000,
        type: "expense",
        category: "Gaming",
      },
    ],
  };

  const expenses = financialData.transactions.filter(
    (t) => t.type === "expense"
  );
  const investments = financialData.transactions.filter(
    (t) => t.type === "investment"
  );
  const gamingExpenses = expenses.filter((e) => e.category === "Gaming");
  const recoveryInvestments = investments.filter(
    (i) => i.category === "Recovery"
  );

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 lg:mb-8">
        <div>
          <Link
            to={`/users/${user.id}`}
            className="inline-flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition mb-3 lg:mb-4 text-sm lg:text-base"
          >
            ← Back
          </Link>
          <h1 className="text-2xl lg:text-3xl font-bold text-indigo-300">
            {user.name}'s Financial Summary
          </h1>
          <p className="text-gray-300 mt-1 lg:mt-2 text-sm lg:text-base">
            Track expenses, purchases, and financial progress
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 lg:px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs lg:text-sm font-semibold">
            Financial Tracking
          </span>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="p-4 lg:p-6 bg-green-500/20 rounded-xl border border-green-500/30">
          <div className="text-xl lg:text-2xl font-bold text-green-300">
            ₹{financialData.initialBalance.toLocaleString()}
          </div>
          <div className="text-xs lg:text-sm text-green-200">
            Initial Balance
          </div>
        </div>

        <div className="p-4 lg:p-6 bg-red-500/20 rounded-xl border border-red-500/30">
          <div className="text-xl lg:text-2xl font-bold text-red-300">
            ₹{financialData.totalSpent.toLocaleString()}
          </div>
          <div className="text-xs lg:text-sm text-red-200">Total Spent</div>
        </div>

        <div className="p-4 lg:p-6 bg-blue-500/20 rounded-xl border border-blue-500/30">
          <div className="text-xl lg:text-2xl font-bold text-blue-300">
            ₹{financialData.currentBalance.toLocaleString()}
          </div>
          <div className="text-xs lg:text-sm text-blue-200">
            Current Balance
          </div>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Gaming Expenses */}
        <div className="p-4 lg:p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-lg lg:text-xl font-semibold text-red-300 mb-3 lg:mb-4">
            Gaming Expenses
          </h3>
          <div className="space-y-2 lg:space-y-3">
            {gamingExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex justify-between items-center p-2 lg:p-3 bg-red-500/10 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm lg:text-base truncate">
                    {expense.description}
                  </div>
                  <div className="text-gray-400 text-xs lg:text-sm">
                    {expense.date}
                  </div>
                </div>
                <div className="text-red-300 font-bold text-sm lg:text-base ml-2 lg:ml-4">
                  -₹{expense.amount.toLocaleString()}
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2 lg:pt-3 border-t border-white/10">
              <div className="text-white font-semibold text-sm lg:text-base">
                Total Gaming Expenses
              </div>
              <div className="text-red-300 font-bold text-sm lg:text-base">
                -₹
                {gamingExpenses
                  .reduce((sum, e) => sum + e.amount, 0)
                  .toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Recovery Investments */}
        <div className="p-4 lg:p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-lg lg:text-xl font-semibold text-green-300 mb-3 lg:mb-4">
            Recovery Investments
          </h3>
          <div className="space-y-2 lg:space-y-3">
            {recoveryInvestments.map((investment) => (
              <div
                key={investment.id}
                className="flex justify-between items-center p-2 lg:p-3 bg-green-500/10 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm lg:text-base truncate">
                    {investment.description}
                  </div>
                  <div className="text-gray-400 text-xs lg:text-sm">
                    {investment.date}
                  </div>
                </div>
                <div className="text-green-300 font-bold text-sm lg:text-base ml-2 lg:ml-4">
                  -₹{investment.amount.toLocaleString()}
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2 lg:pt-3 border-t border-white/10">
              <div className="text-white font-semibold text-sm lg:text-base">
                Total Recovery Investments
              </div>
              <div className="text-green-300 font-bold text-sm lg:text-base">
                -₹
                {recoveryInvestments
                  .reduce((sum, i) => sum + i.amount, 0)
                  .toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Transactions */}
      <div className="p-4 lg:p-6 bg-white/5 rounded-xl border border-white/10">
        <h3 className="text-lg lg:text-xl font-semibold text-indigo-300 mb-3 lg:mb-4">
          All Transactions
        </h3>
        <div className="space-y-2">
          {financialData.transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`flex justify-between items-center p-2 lg:p-3 rounded-lg ${
                transaction.type === "expense"
                  ? "bg-red-500/10"
                  : "bg-green-500/10"
              }`}
            >
              <div className="flex items-center gap-2 lg:gap-4 flex-1 min-w-0">
                <span
                  className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full flex-shrink-0 ${
                    transaction.type === "expense"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                ></span>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm lg:text-base truncate">
                    {transaction.description}
                  </div>
                  <div className="text-gray-400 text-xs lg:text-sm">
                    {transaction.date} • {transaction.category}
                  </div>
                </div>
              </div>
              <div
                className={`font-bold text-sm lg:text-base ml-2 lg:ml-4 flex-shrink-0 ${
                  transaction.type === "expense"
                    ? "text-red-300"
                    : "text-green-300"
                }`}
              >
                {transaction.type === "expense" ? "-" : ""}₹
                {transaction.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Savings Progress */}
      <div className="p-4 lg:p-6 bg-white/5 rounded-xl border border-white/10">
        <h3 className="text-lg lg:text-xl font-semibold text-yellow-300 mb-3 lg:mb-4">
          Savings Progress
        </h3>
        <div className="space-y-3 lg:space-y-4">
          <div>
            <div className="flex justify-between text-xs lg:text-sm text-white mb-1">
              <span>Money Saved</span>
              <span>
                ₹{financialData.currentBalance.toLocaleString()} / ₹
                {financialData.initialBalance.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 lg:h-3">
              <div
                className="bg-yellow-500 h-2 lg:h-3 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    (financialData.currentBalance /
                      financialData.initialBalance) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <div className="text-center text-gray-300 text-sm lg:text-base">
            {(
              (financialData.currentBalance / financialData.initialBalance) *
              100
            ).toFixed(1)}
            % of initial balance saved
          </div>
        </div>
      </div>
    </div>
  );
}
