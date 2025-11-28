import { useParams, useNavigate, Link } from "react-router-dom";
import { useUsers } from "../context/UsersContext";
import { useState, useEffect } from "react";
import CustomDropdown from "../context/CustomDropdown";

export default function UserRecoveries() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users } = useUsers();

  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDay, setSelectedDay] = useState("all");

  useEffect(() => {
    const u = users.find((u) => u.id === parseInt(id));
    if (u) {
      setUser(u);
    }
  }, [id, users]);

  if (!user)
    return (
      <p className="p-4 lg:p-6 text-red-500 font-semibold text-center">
        User not found
      </p>
    );

  // ✅ Condition: Sirf recovered users ki recovery data show karen
  if (user.status !== "Recovered") {
    return (
      <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Link
              to={`/users/${user.id}`}
              className="inline-flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition mb-3 lg:mb-4 text-sm lg:text-base"
            >
              ← Back
            </Link>
            <h1 className="text-2xl lg:text-3xl font-bold text-indigo-300">
              {user.name}'s Recovery Journey
            </h1>
            <p className="text-gray-300 mt-1 lg:mt-2 text-sm lg:text-base">
              Detailed tracking of daily progress and completed tasks
            </p>
          </div>
        </div>

        {/* ✅ Message for not recovered users */}
        <div className="p-4 lg:p-8 bg-yellow-500/20 border border-yellow-500/30 rounded-xl text-center">
          <div className="text-4xl lg:text-6xl mb-3 lg:mb-4">⏳</div>
          <h2 className="text-xl lg:text-2xl font-bold text-yellow-300 mb-2">
            Recovery in Progress
          </h2>
          <p className="text-yellow-200 mb-3 lg:mb-4 text-sm lg:text-base">
            {user.name} is still on their recovery journey. Recovery analytics
            will be available once they complete their program.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center items-center">
            <div className="px-3 lg:px-4 py-2 bg-yellow-500/30 rounded-lg text-sm lg:text-base">
              <span className="font-semibold text-yellow-300">
                Current Status:
              </span>{" "}
              {user.status}
            </div>
            <div className="px-3 lg:px-4 py-2 bg-indigo-500/30 rounded-lg text-sm lg:text-base">
              <span className="font-semibold text-indigo-300">
                Day {user.days}
              </span>{" "}
              of {user.targetDays}
            </div>
          </div>
          <div className="mt-4 lg:mt-6 w-full bg-white/10 rounded-full h-2 lg:h-3">
            <div
              className="bg-indigo-500 h-2 lg:h-3 rounded-full transition-all duration-500"
              style={{
                width:
                  user.targetDays > 0
                    ? `${Math.min((user.days / user.targetDays) * 100, 100)}%`
                    : "0%",
              }}
            ></div>
          </div>
          <p className="text-yellow-100 mt-2 text-xs lg:text-sm">
            Progress: {user.days}/{user.targetDays} days (
            {Math.round((user.days / user.targetDays) * 100)}%)
          </p>
        </div>

        {/* ✅ Current Progress Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
          <div className="p-3 lg:p-4 bg-white/5 rounded-xl border border-white/10 text-center">
            <div className="text-xl lg:text-2xl font-bold text-green-300">
              {user.days}
            </div>
            <div className="text-xs lg:text-sm text-green-200">
              Days Completed
            </div>
          </div>
          <div className="p-3 lg:p-4 bg-white/5 rounded-xl border border-white/10 text-center">
            <div className="text-xl lg:text-2xl font-bold text-blue-300">
              {user.targetDays - user.days}
            </div>
            <div className="text-xs lg:text-sm text-blue-200">
              Days Remaining
            </div>
          </div>
          <div className="p-3 lg:p-4 bg-white/5 rounded-xl border border-white/10 text-center">
            <div className="text-xl lg:text-2xl font-bold text-purple-300">
              {Math.round((user.days / user.targetDays) * 100)}%
            </div>
            <div className="text-xs lg:text-sm text-purple-200">
              Overall Progress
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Sirf recovered users ke liye recovery data show karen
  const recoveryData = user.recoveryData || [
    {
      day: 1,
      date: "2024-01-01",
      category: "gaming",
      completedTasks: [
        "30 minutes meditation",
        "No gaming before 6 PM",
        "Outdoor activity for 1 hour",
      ],
      pendingTasks: ["Read a book for 30 minutes"],
      notes: "Felt strong cravings in the evening",
    },
    {
      day: 2,
      date: "2024-01-02",
      category: "gaming",
      completedTasks: [
        "30 minutes meditation",
        "Read a book for 30 minutes",
        "Gym workout",
      ],
      pendingTasks: ["No gaming before 6 PM"],
      notes: "Managed to control impulses better",
    },
    {
      day: 3,
      date: "2024-01-03",
      category: "gaming",
      completedTasks: [
        "All tasks completed successfully!",
        "No gaming entire day",
        "Social activity with friends",
      ],
      pendingTasks: [],
      notes: "Excellent progress today!",
    },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "gaming", label: "Gaming Addiction" },
    { value: "social_media", label: "Social Media" },
    { value: "substance", label: "Substance Abuse" },
    { value: "other", label: "Other Addictions" },
  ];

  const filteredData = recoveryData.filter((entry) => {
    const categoryMatch =
      selectedCategory === "all" || entry.category === selectedCategory;
    const dayMatch =
      selectedDay === "all" || entry.day === parseInt(selectedDay);
    return categoryMatch && dayMatch;
  });

  const uniqueDays = [...new Set(recoveryData.map((entry) => entry.day))].sort(
    (a, b) => a - b
  );

  const getCategoryColor = (category) => {
    const colors = {
      gaming: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      social_media: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      substance: "bg-red-500/20 text-red-300 border-red-500/30",
      other: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    };
    return colors[category] || colors.other;
  };

  const getProgressPercentage = (dayData) => {
    const totalTasks =
      dayData.completedTasks.length + dayData.pendingTasks.length;
    return totalTasks > 0
      ? (dayData.completedTasks.length / totalTasks) * 100
      : 0;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Link
            to={`/users/${user.id}`}
            className="inline-flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition mb-3 lg:mb-4 text-sm lg:text-base"
          >
            ← Back
          </Link>
          <h1 className="text-2xl lg:text-3xl font-bold text-indigo-300">
            {user.name}'s Recovery Journey
          </h1>
          <p className="text-gray-300 mt-1 lg:mt-2 text-sm lg:text-base">
            Detailed tracking of daily progress and completed tasks
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="px-2 lg:px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs lg:text-sm font-semibold">
            Recovered
          </span>
          <span className="px-2 lg:px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs lg:text-sm font-semibold">
            Completed in {user.days} days
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 p-3 lg:p-4 bg-white/5 rounded-xl border border-white/10">
        <div>
          <label className="block text-xs lg:text-sm font-semibold text-white mb-2">
            Filter by Category
          </label>
          <CustomDropdown
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={categories}
            placeholder="Select Category"
          />
        </div>

        <div>
          <label className="block text-xs lg:text-sm font-semibold text-white mb-2">
            Filter by Day
          </label>
          <CustomDropdown
            value={selectedDay}
            onChange={setSelectedDay}
            options={[
              { value: "all", label: "All Days" },
              ...uniqueDays.map((day) => ({ value: day, label: `Day ${day}` })),
            ]}
            placeholder="Select Day"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedDay("all");
            }}
            className="w-full px-3 lg:px-4 py-2 rounded-lg bg-[#4C1B76] hover:bg-[#5A2188] text-white transition border-none font-medium focus:outline-none focus:ring-0 text-sm lg:text-base"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Recovery Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
        <div className="p-3 lg:p-4 bg-green-500/20 rounded-xl border border-green-500/30">
          <div className="text-xl lg:text-2xl font-bold text-green-300">
            {recoveryData.length}
          </div>
          <div className="text-xs lg:text-sm text-green-200">
            Total Days Tracked
          </div>
        </div>
        <div className="p-3 lg:p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
          <div className="text-xl lg:text-2xl font-bold text-blue-300">
            {
              recoveryData.filter((day) => getProgressPercentage(day) === 100)
                .length
            }
          </div>
          <div className="text-xs lg:text-sm text-blue-200">Perfect Days</div>
        </div>
        <div className="p-3 lg:p-4 bg-purple-500/20 rounded-xl border border-purple-500/30">
          <div className="text-xl lg:text-2xl font-bold text-purple-300">
            {recoveryData.reduce(
              (total, day) => total + day.completedTasks.length,
              0
            )}
          </div>
          <div className="text-xs lg:text-sm text-purple-200">
            Tasks Completed
          </div>
        </div>
        <div className="p-3 lg:p-4 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
          <div className="text-xl lg:text-2xl font-bold text-yellow-300">
            {Math.round(
              recoveryData.reduce(
                (total, day) => total + getProgressPercentage(day),
                0
              ) / recoveryData.length
            )}
            %
          </div>
          <div className="text-xs lg:text-sm text-yellow-200">
            Average Progress
          </div>
        </div>
      </div>

      {/* Recovery Entries */}
      <div className="space-y-3 lg:space-y-4">
        {filteredData.length === 0 ? (
          <div className="text-center p-6 lg:p-8 bg-white/5 rounded-xl border border-white/10">
            <p className="text-gray-400 text-base lg:text-lg">
              No recovery data found for the selected filters.
            </p>
          </div>
        ) : (
          filteredData.map((entry, index) => (
            <div
              key={index}
              className="p-4 lg:p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 lg:gap-4 mb-3 lg:mb-4">
                <div className="flex flex-wrap items-center gap-2 lg:gap-4">
                  <div className="px-3 lg:px-4 py-1 lg:py-2 bg-indigo-500/20 text-indigo-300 rounded-lg font-bold text-sm lg:text-base">
                    Day {entry.day}
                  </div>
                  <div
                    className={`px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm border ${getCategoryColor(
                      entry.category
                    )}`}
                  >
                    {
                      categories.find((cat) => cat.value === entry.category)
                        ?.label
                    }
                  </div>
                  <div className="text-gray-300 text-xs lg:text-sm">
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-3 lg:gap-4 mt-2 md:mt-0">
                  <div className="text-right">
                    <div className="text-base lg:text-lg font-bold text-green-300">
                      {Math.round(getProgressPercentage(entry))}% Complete
                    </div>
                    <div className="text-xs lg:text-sm text-gray-400">
                      {entry.completedTasks.length} of{" "}
                      {entry.completedTasks.length + entry.pendingTasks.length}{" "}
                      tasks
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/10 rounded-full h-2 lg:h-3 mb-3 lg:mb-4">
                <div
                  className="bg-green-500 h-2 lg:h-3 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressPercentage(entry)}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {/* Completed Tasks */}
                <div>
                  <h3 className="text-base lg:text-lg font-semibold text-green-300 mb-2 lg:mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Completed Tasks ({entry.completedTasks.length})
                  </h3>
                  <ul className="space-y-2">
                    {entry.completedTasks.map((task, taskIndex) => (
                      <li
                        key={taskIndex}
                        className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-xs lg:text-sm"
                      >
                        <span className="text-green-400 text-sm lg:text-base">
                          ✓
                        </span>
                        <span className="text-green-200">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pending Tasks */}
                <div>
                  <h3 className="text-base lg:text-lg font-semibold text-red-300 mb-2 lg:mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Pending Tasks ({entry.pendingTasks.length})
                  </h3>
                  {entry.pendingTasks.length > 0 ? (
                    <ul className="space-y-2">
                      {entry.pendingTasks.map((task, taskIndex) => (
                        <li
                          key={taskIndex}
                          className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-red-500/10 rounded-lg border border-red-500/20 text-xs lg:text-sm"
                        >
                          <span className="text-red-400 text-sm lg:text-base">
                            ✗
                          </span>
                          <span className="text-red-200">{task}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-3 lg:p-4 bg-green-500/10 rounded-lg border border-green-500/20 text-center text-xs lg:text-sm">
                      <span className="text-green-300">
                        All tasks completed! Excellent work! 🎉
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              {entry.notes && (
                <div className="mt-3 lg:mt-4 p-3 lg:p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="text-xs lg:text-sm font-semibold text-blue-300 mb-1 lg:mb-2">
                    Daily Notes:
                  </h4>
                  <p className="text-blue-200 text-xs lg:text-sm">
                    {entry.notes}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
