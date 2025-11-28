import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../context/UsersContext";

const Breathing = () => {
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

  const breathingActivities = [
    {
      id: 1,
      name: "Box Breathing",
      duration: "5-10 minutes",
      cycles: "5-10 cycles",
      timePerCycle: "16 seconds per cycle",
    },
    {
      id: 2,
      name: "4-7-8 Breathing",
      duration: "2-4 minutes",
      cycles: "4 cycles",
      timePerCycle: "19 seconds per cycle",
    },
    {
      id: 3,
      name: "Deep Belly Breathing",
      duration: "5-10 minutes",
      cycles: "Continuous",
      timePerCycle: "10 seconds per cycle",
    },
    {
      id: 4,
      name: "Alternate Nostril",
      duration: "5-10 minutes",
      cycles: "10-20 cycles",
      timePerCycle: "12 seconds per cycle",
    },
    {
      id: 5,
      name: "Lion's Breath",
      duration: "1-2 minutes",
      cycles: "3-5 cycles",
      timePerCycle: "15 seconds per cycle",
    },
    {
      id: 6,
      name: "Humming Bee Breath",
      duration: "3-5 minutes",
      cycles: "5-7 cycles",
      timePerCycle: "20 seconds per cycle",
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
              Breathing Exercises
            </h1>
            <p className="text-white/80 mt-1 lg:mt-2 text-sm lg:text-lg">
              For {user.name} • Breathing techniques with time and cycle
              information
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
          {/* Breathing Techniques Grid */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-white/20 shadow-lg p-4 lg:p-8">
            <div className="text-center mb-6 lg:mb-8">
              <h2 className="text-xl lg:text-3xl font-bold text-white mb-3 lg:mb-4">
                Breathing Techniques
              </h2>
              <p className="text-white/70 text-sm lg:text-lg max-w-3xl mx-auto">
                Various breathing exercises with recommended duration and cycle
                information for optimal practice.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {breathingActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-xl lg:rounded-2xl border border-cyan-200/30 hover:border-cyan-300/50 transition-all duration-300 hover:shadow-xl p-4 lg:p-6"
                >
                  {/* Activity Header */}
                  <div className="mb-3 lg:mb-4">
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-2 lg:mb-3">
                      {activity.name}
                    </h3>
                  </div>

                  {/* Time and Cycles Information */}
                  <div className="space-y-2 lg:space-y-3">
                    {/* Duration */}
                    <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                          <span className="text-cyan-400 text-xs lg:text-sm">
                            ⏱️
                          </span>
                        </div>
                        <span className="text-white text-xs lg:text-sm">
                          Duration
                        </span>
                      </div>
                      <span className="text-cyan-300 font-semibold text-xs lg:text-sm">
                        {activity.duration}
                      </span>
                    </div>

                    {/* Cycles */}
                    <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-teal-500/20 rounded-full flex items-center justify-center">
                          <span className="text-teal-400 text-xs lg:text-sm">
                            🔄
                          </span>
                        </div>
                        <span className="text-white text-xs lg:text-sm">
                          Cycles
                        </span>
                      </div>
                      <span className="text-teal-300 font-semibold text-xs lg:text-sm">
                        {activity.cycles}
                      </span>
                    </div>

                    {/* Time per Cycle */}
                    <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <span className="text-blue-400 text-xs lg:text-sm">
                            ⚡
                          </span>
                        </div>
                        <span className="text-white text-xs lg:text-sm">
                          Time/Cycle
                        </span>
                      </div>
                      <span className="text-blue-300 font-semibold text-xs lg:text-sm">
                        {activity.timePerCycle}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-white/20 shadow-lg p-4 lg:p-8">
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6 text-center">
              Practice Guidelines
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <div className="text-center p-3 lg:p-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 border border-cyan-400/30">
                  <span className="text-xl lg:text-2xl">⏰</span>
                </div>
                <h4 className="font-semibold text-white mb-1 lg:mb-2 text-sm lg:text-base">
                  Optimal Duration
                </h4>
                <p className="text-white/70 text-xs lg:text-sm">
                  5-10 minutes daily for best results
                </p>
              </div>
              <div className="text-center p-3 lg:p-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 border border-teal-400/30">
                  <span className="text-xl lg:text-2xl">📊</span>
                </div>
                <h4 className="font-semibold text-white mb-1 lg:mb-2 text-sm lg:text-base">
                  Cycle Range
                </h4>
                <p className="text-white/70 text-xs lg:text-sm">
                  3-10 cycles per session recommended
                </p>
              </div>
              <div className="text-center p-3 lg:p-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 border border-blue-400/30">
                  <span className="text-xl lg:text-2xl">🎯</span>
                </div>
                <h4 className="font-semibold text-white mb-1 lg:mb-2 text-sm lg:text-base">
                  Consistency
                </h4>
                <p className="text-white/70 text-xs lg:text-sm">
                  Daily practice brings maximum benefits
                </p>
              </div>
              <div className="text-center p-3 lg:p-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 border border-purple-400/30">
                  <span className="text-xl lg:text-2xl">💺</span>
                </div>
                <h4 className="font-semibold text-white mb-1 lg:mb-2 text-sm lg:text-base">
                  Posture
                </h4>
                <p className="text-white/70 text-xs lg:text-sm">
                  Sit comfortably with straight back
                </p>
              </div>
            </div>
          </div>

          {/* Quick Reference */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-white/20 shadow-lg p-4 lg:p-6">
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4 text-center">
              Quick Reference Guide
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-white min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-semibold text-sm lg:text-base">
                      Technique
                    </th>
                    <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-semibold text-sm lg:text-base">
                      Duration
                    </th>
                    <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-semibold text-sm lg:text-base">
                      Cycles
                    </th>
                    <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-semibold text-sm lg:text-base">
                      Time/Cycle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {breathingActivities.map((activity) => (
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
                      <td className="py-2 lg:py-3 px-2 lg:px-4 text-sm lg:text-base">
                        {activity.cycles}
                      </td>
                      <td className="py-2 lg:py-3 px-2 lg:px-4 text-sm lg:text-base">
                        {activity.timePerCycle}
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
        </div>
      </div>
    </div>
  );
};

export default Breathing;
