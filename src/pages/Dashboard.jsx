import { useUsers } from "../context/UsersContext";

export default function Dashboard() {
  const { users } = useUsers();

  // Calculate statistics from actual users data
  const totalUsers = users.length;
  const recoveredUsers = users.filter(
    (user) => user.status === "Recovered"
  ).length;
  const notRecovered = totalUsers - recoveredUsers;
  const recoveryRate =
    totalUsers > 0 ? ((recoveredUsers / totalUsers) * 100).toFixed(1) : "0.0";

  // Additional statistics
  const totalDaysClean = users.reduce((total, user) => total + user.days, 0);
  const averageDaysClean =
    totalUsers > 0 ? (totalDaysClean / totalUsers).toFixed(1) : "0.0";
  const blockedUsers = users.filter((user) => user.isBlocked).length;

  return (
    <div className="space-y-4 lg:space-y-6 p-4 lg:p-0">
      <h1 className="text-2xl lg:text-3xl font-bold text-white">
        Dashboard Overview
      </h1>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="p-4 lg:p-6 bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-white/10 shadow-xl hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <span className="text-xl lg:text-2xl">👥</span>
            </div>
            <h2 className="text-lg lg:text-xl font-semibold text-white">
              Total Users
            </h2>
          </div>
          <p className="text-3xl lg:text-4xl font-bold text-blue-300">
            {totalUsers}
          </p>
          <p className="text-xs lg:text-sm text-gray-300 mt-2">
            Registered in system
          </p>
        </div>

        <div className="p-4 lg:p-6 bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-white/10 shadow-xl hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <span className="text-xl lg:text-2xl">✅</span>
            </div>
            <h2 className="text-lg lg:text-xl font-semibold text-white">
              Recovered
            </h2>
          </div>
          <p className="text-3xl lg:text-4xl font-bold text-green-400">
            {recoveredUsers}
          </p>
          <p className="text-xs lg:text-sm text-gray-300 mt-2">
            Successfully recovered
          </p>
        </div>

        <div className="p-4 lg:p-6 bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-white/10 shadow-xl hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <span className="text-xl lg:text-2xl">🔄</span>
            </div>
            <h2 className="text-lg lg:text-xl font-semibold text-white">
              In Progress
            </h2>
          </div>
          <p className="text-3xl lg:text-4xl font-bold text-yellow-400">
            {notRecovered}
          </p>
          <p className="text-xs lg:text-sm text-gray-300 mt-2">
            Currently in recovery
          </p>
        </div>

        <div className="p-4 lg:p-6 bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-white/10 shadow-xl hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <span className="text-xl lg:text-2xl">🚫</span>
            </div>
            <h2 className="text-lg lg:text-xl font-semibold text-white">
              Blocked
            </h2>
          </div>
          <p className="text-3xl lg:text-4xl font-bold text-red-400">
            {blockedUsers}
          </p>
          <p className="text-xs lg:text-sm text-gray-300 mt-2">
            Suspended accounts
          </p>
        </div>
      </div>

      {/* Recovery Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="p-4 lg:p-6 bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-white/10 shadow-xl">
          <h2 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">
            Recovery Rate
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <p className="text-4xl lg:text-5xl font-bold text-indigo-300">
              {recoveryRate}%
            </p>
            <div className="flex-1">
              <div className="w-full bg-white/10 rounded-full h-3 lg:h-4 mb-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-indigo-500 h-3 lg:h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${recoveryRate}%` }}
                ></div>
              </div>
              <p className="text-xs lg:text-sm text-gray-300">
                {recoveredUsers} out of {totalUsers} users recovered
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 lg:p-6 bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-white/10 shadow-xl">
          <h2 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">
            Average Progress
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <p className="text-4xl lg:text-5xl font-bold text-purple-300">
              {averageDaysClean}
            </p>
            <div className="flex-1">
              <p className="text-base lg:text-lg text-purple-300 font-semibold">
                Days Clean
              </p>
              <p className="text-xs lg:text-sm text-gray-300">
                Average days across all users
              </p>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs lg:text-sm">
                  Total: {totalDaysClean} days
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <div className="p-3 lg:p-4 bg-white/5 rounded-lg lg:rounded-xl border border-white/10 text-center">
          <div className="text-xl lg:text-2xl font-bold text-blue-300 mb-1">
            {users.filter((user) => user.days >= 30).length}
          </div>
          <div className="text-xs lg:text-sm text-blue-200">30+ Days Clean</div>
        </div>

        <div className="p-3 lg:p-4 bg-white/5 rounded-lg lg:rounded-xl border border-white/10 text-center">
          <div className="text-xl lg:text-2xl font-bold text-green-300 mb-1">
            {users.filter((user) => user.days >= 7 && user.days < 30).length}
          </div>
          <div className="text-xs lg:text-sm text-green-200">
            7-30 Days Clean
          </div>
        </div>

        <div className="p-3 lg:p-4 bg-white/5 rounded-lg lg:rounded-xl border border-white/10 text-center">
          <div className="text-xl lg:text-2xl font-bold text-yellow-300 mb-1">
            {users.filter((user) => user.days < 7).length}
          </div>
          <div className="text-xs lg:text-sm text-yellow-200">
            Less than 7 Days
          </div>
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="p-4 lg:p-6 bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-white/10 shadow-xl">
        <h2 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">
          Recent Activity Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 text-xs lg:text-sm">
          <div className="p-2 lg:p-3 bg-white/5 rounded-lg">
            <span className="text-green-400">✓</span> {recoveredUsers} users
            completed recovery this month
          </div>
          <div className="p-2 lg:p-3 bg-white/5 rounded-lg">
            <span className="text-blue-400">📈</span>{" "}
            {users.filter((u) => u.days > 0).length} active recovery journeys
          </div>
          <div className="p-2 lg:p-3 bg-white/5 rounded-lg">
            <span className="text-yellow-400">⏳</span> {notRecovered} users in
            progress
          </div>
          <div className="p-2 lg:p-3 bg-white/5 rounded-lg">
            <span className="text-red-400">⚠️</span> {blockedUsers} accounts
            need attention
          </div>
        </div>
      </div>
    </div>
  );
}
