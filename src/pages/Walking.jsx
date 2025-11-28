import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../context/UsersContext";

const Walking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users } = useUsers();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = users.find((u) => u.id === parseInt(id));
    if (u) {
      setUser(u);
    }
  }, [id, users]);

  const handleBackClick = () => {
    navigate(`/users/${id}`);
  };

  const walkingActivities = [
    {
      id: 1,
      name: "Morning Brisk Walk",
      duration: "30 mins",
      intensity: "Moderate",
      steps: "3,000",
      pace: "6-7 min/km",
    },
    {
      id: 2,
      name: "Evening Relaxation Walk",
      duration: "45 mins",
      intensity: "Light",
      steps: "4,500",
      pace: "8-9 min/km",
    },
    {
      id: 3,
      name: "Interval Power Walking",
      duration: "25 mins",
      intensity: "High",
      steps: "2,500",
      pace: "5-6 min/km",
    },
    {
      id: 4,
      name: "Nature Trail Walk",
      duration: "60 mins",
      intensity: "Moderate",
      steps: "6,000",
      pace: "7-8 min/km",
    },
    {
      id: 5,
      name: "Lunch Break Walk",
      duration: "20 mins",
      intensity: "Light",
      steps: "2,000",
      pace: "8-10 min/km",
    },
    {
      id: 6,
      name: "Weekend Long Walk",
      duration: "90 mins",
      intensity: "Moderate",
      steps: "8,000",
      pace: "7-8 min/km",
    },
  ];

  const walkingGoals = [
    {
      id: 1,
      name: "Daily Steps",
      target: 10000,
      current: 8452,
      unit: "steps",
      icon: "👣",
      progress: 84,
    },
    {
      id: 2,
      name: "Weekly Active Days",
      target: 5,
      current: 3,
      unit: "days",
      icon: "📅",
      progress: 60,
    },
    {
      id: 3,
      name: "Monthly Walking",
      target: 30,
      current: 18,
      unit: "sessions",
      icon: "🚶‍♂️",
      progress: 60,
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-red-500 font-semibold text-lg">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 lg:mb-8">
          <div className="flex-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-white">
              Walking Activities
            </h1>
            <p className="text-white/80 mt-1 lg:mt-2 text-sm lg:text-lg">
              For {user.name} • Explore various walking routines with step
              counts
            </p>
          </div>
          <button
            onClick={handleBackClick}
            className="inline-flex items-center justify-center gap-2 px-4 lg:px-6 py-2 lg:py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition border border-white/20 text-sm lg:text-base w-full lg:w-auto"
          >
            ← Back
          </button>
        </div>

        <div className="space-y-6 lg:space-y-8">
          {/* Walking Activities Grid */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-white/20 shadow-lg p-4 lg:p-8">
            <div className="text-center mb-6 lg:mb-8">
              <h2 className="text-xl lg:text-3xl font-bold text-white mb-3 lg:mb-4">
                Walking Routines
              </h2>
              <p className="text-white/70 text-sm lg:text-lg max-w-3xl mx-auto">
                Various walking exercises with duration, step counts, and pace
                information for different fitness levels.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {walkingActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl lg:rounded-2xl border border-orange-200/30 hover:border-orange-300/50 transition-all duration-300 hover:shadow-xl p-4 lg:p-6"
                >
                  {/* Activity Header */}
                  <div className="mb-3 lg:mb-4">
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-2">
                      {activity.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-2 lg:mb-3">
                      <span className="inline-block px-2 lg:px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs lg:text-sm font-medium border border-orange-400/30">
                        {activity.duration}
                      </span>
                      <span className="inline-block px-2 lg:px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs lg:text-sm font-medium border border-red-400/30">
                        {activity.intensity}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-3 lg:mb-4">
                    <div className="text-center p-2 lg:p-3 bg-orange-500/10 rounded-lg">
                      <p className="text-white font-bold text-base lg:text-lg">
                        {activity.steps}
                      </p>
                      <p className="text-orange-300 text-xs lg:text-sm">
                        Steps
                      </p>
                    </div>
                    <div className="text-center p-2 lg:p-3 bg-red-500/10 rounded-lg">
                      <p className="text-white font-bold text-base lg:text-lg">
                        {activity.pace}
                      </p>
                      <p className="text-red-300 text-xs lg:text-sm">Pace</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Walking Goals */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-white/20 shadow-lg p-4 lg:p-8">
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6 text-center">
              Walking Goals Progress
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {walkingGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl border border-orange-200/30 p-4 lg:p-6"
                >
                  <div className="flex items-center justify-between mb-3 lg:mb-4">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <span className="text-xl lg:text-2xl">{goal.icon}</span>
                      <div>
                        <h4 className="font-bold text-white text-sm lg:text-base">
                          {goal.name}
                        </h4>
                        <p className="text-orange-300 text-xs lg:text-sm">
                          {goal.current} / {goal.target} {goal.unit}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-orange-500/20 rounded-full h-2 lg:h-3 mb-1 lg:mb-2">
                    <div
                      className="bg-orange-400 h-2 lg:h-3 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-orange-300 text-xs lg:text-sm text-right">
                    {goal.progress}% Complete
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Reference */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-white/20 shadow-lg p-4 lg:p-6">
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4 text-center">
              Walking Routines Overview
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-white min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-semibold text-sm lg:text-base">
                      Walking Type
                    </th>
                    <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-semibold text-sm lg:text-base">
                      Duration
                    </th>
                    <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-semibold text-sm lg:text-base">
                      Intensity
                    </th>
                    <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-semibold text-sm lg:text-base">
                      Steps
                    </th>
                    <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-semibold text-sm lg:text-base">
                      Pace
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {walkingActivities.map((activity) => (
                    <tr
                      key={activity.id}
                      className="border-b border-white/10 hover:bg-white/5"
                    >
                      <td className="py-2 lg:py-3 px-2 lg:px-4 font-medium text-sm lg:text-base">
                        {activity.name}
                      </td>
                      <td className="py-2 lg:py-3 px-2 lg:px-4 text-sm lg:text-base">
                        {activity.duration}
                      </td>
                      <td className="py-2 lg:py-3 px-2 lg:px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs lg:text-sm ${
                            activity.intensity === "High"
                              ? "bg-red-500/20 text-red-300"
                              : activity.intensity === "Moderate"
                              ? "bg-orange-500/20 text-orange-300"
                              : "bg-green-500/20 text-green-300"
                          }`}
                        >
                          {activity.intensity}
                        </span>
                      </td>
                      <td className="py-2 lg:py-3 px-2 lg:px-4 text-sm lg:text-base">
                        {activity.steps}
                      </td>
                      <td className="py-2 lg:py-3 px-2 lg:px-4 text-sm lg:text-base">
                        {activity.pace}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile note for table */}
            <div className="lg:hidden mt-3 text-center">
              <p className="text-white/60 text-xs">
                Swipe horizontally to view full table →
              </p>
            </div>
          </div>

          {/* Walking Tips Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-white/20 shadow-lg p-4 lg:p-6">
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 text-center">
              Walking Benefits & Tips
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-3 lg:p-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3 border border-orange-400/30">
                  <span className="text-xl lg:text-2xl">❤️</span>
                </div>
                <h4 className="font-semibold text-white mb-1 lg:mb-2 text-sm lg:text-base">
                  Heart Health
                </h4>
                <p className="text-white/70 text-xs lg:text-sm">
                  Improves cardiovascular fitness
                </p>
              </div>
              <div className="text-center p-3 lg:p-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3 border border-red-400/30">
                  <span className="text-xl lg:text-2xl">😊</span>
                </div>
                <h4 className="font-semibold text-white mb-1 lg:mb-2 text-sm lg:text-base">
                  Mental Wellbeing
                </h4>
                <p className="text-white/70 text-xs lg:text-sm">
                  Reduces stress and anxiety
                </p>
              </div>
              <div className="text-center p-3 lg:p-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3 border border-green-400/30">
                  <span className="text-xl lg:text-2xl">💪</span>
                </div>
                <h4 className="font-semibold text-white mb-1 lg:mb-2 text-sm lg:text-base">
                  Bone Strength
                </h4>
                <p className="text-white/70 text-xs lg:text-sm">
                  Strengthens bones and joints
                </p>
              </div>
              <div className="text-center p-3 lg:p-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3 border border-blue-400/30">
                  <span className="text-xl lg:text-2xl">⚡</span>
                </div>
                <h4 className="font-semibold text-white mb-1 lg:mb-2 text-sm lg:text-base">
                  Energy Boost
                </h4>
                <p className="text-white/70 text-xs lg:text-sm">
                  Increases energy levels
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Walking;
