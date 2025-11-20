import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UsersContext';

const Walking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users } = useUsers();
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = users.find(u => u.id === parseInt(id));
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
      name: 'Morning Brisk Walk', 
      duration: '30 mins', 
      intensity: 'Moderate',
      steps: '3,000',
      pace: '6-7 min/km'
    },
    { 
      id: 2, 
      name: 'Evening Relaxation Walk', 
      duration: '45 mins', 
      intensity: 'Light',
      steps: '4,500',
      pace: '8-9 min/km'
    },
    { 
      id: 3, 
      name: 'Interval Power Walking', 
      duration: '25 mins', 
      intensity: 'High',
      
      steps: '2,500',
      pace: '5-6 min/km'
    },
    { 
      id: 4, 
      name: 'Nature Trail Walk', 
      duration: '60 mins', 
      intensity: 'Moderate',
      steps: '6,000',
      pace: '7-8 min/km'
    },
    { 
      id: 5, 
      name: 'Lunch Break Walk', 
      duration: '20 mins', 
      intensity: 'Light',
      steps: '2,000',
      pace: '8-10 min/km'
    },
    { 
      id: 6, 
      name: 'Weekend Long Walk', 
      duration: '90 mins', 
      intensity: 'Moderate',
      steps: '8,000',
      pace: '7-8 min/km'
    }
  ];

  const walkingGoals = [
    { 
      id: 1, 
      name: 'Daily Steps', 
      target: 10000, 
      current: 8452,
      unit: 'steps',
      icon: '👣',
      progress: 84
    },
    { 
      id: 2, 
      name: 'Weekly Active Days', 
      target: 5, 
      current: 3,
      unit: 'days',
      icon: '📅',
      progress: 60
    },
    { 
      id: 3, 
      name: 'Monthly Walking', 
      target: 30, 
      current: 18,
      unit: 'sessions',
      icon: '🚶‍♂️',
      progress: 60
    }
  ];

  const walkingBenefits = [
    {
      id: 1,
      title: 'Heart Health',
      description: 'Improves cardiovascular fitness and reduces heart disease risk',
      icon: '❤️'
    },
    {
      id: 2,
      title: 'Mental Wellbeing',
      description: 'Reduces stress, anxiety and improves overall mood',
      icon: '😊'
    },
    {
      id: 3,
      title: 'Bone Strength',
      description: 'Strengthens bones and reduces osteoporosis risk',
      icon: '💪'
    },
    {
      id: 4,
      title: 'Energy Boost',
      description: 'Increases energy levels and reduces fatigue',
      icon: '⚡'
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-semibold text-lg">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Walking Activities
            </h1>
            <p className="text-white/80 mt-2 text-lg">
              For {user.name} • Explore various walking routines with step counts
            </p>
          </div>
          <button
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition border border-white/20"
          >
            ← Back
          </button>
        </div>

        <div className="space-y-8">
          {/* Walking Activities Grid */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Walking Routines
              </h2>
              <p className="text-white/70 text-lg max-w-3xl mx-auto">
                Various walking exercises with duration, step counts, and pace information for different fitness levels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {walkingActivities.map(activity => (
                <div key={activity.id} className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-200/30 hover:border-orange-300/50 transition-all duration-300 hover:shadow-xl p-6">
                  {/* Activity Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {activity.name}
                    </h3>
                    <div className="flex gap-2 mb-3">
                      <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium border border-orange-400/30">
                        {activity.duration}
                      </span>
                      <span className="inline-block px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm font-medium border border-red-400/30">
                        {activity.intensity}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/80 mb-4 text-sm leading-relaxed">
                    {activity.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-orange-500/10 rounded-lg">
                      <p className="text-white font-bold text-lg">{activity.steps}</p>
                      <p className="text-orange-300 text-sm">Steps</p>
                    </div>
                    <div className="text-center p-3 bg-red-500/10 rounded-lg">
                      <p className="text-white font-bold text-lg">{activity.pace}</p>
                      <p className="text-red-300 text-sm">Pace</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Walking Goals */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Walking Goals Progress
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {walkingGoals.map(goal => (
                <div key={goal.id} className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl border border-orange-200/30 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{goal.icon}</span>
                      <div>
                        <h4 className="font-bold text-white">{goal.name}</h4>
                        <p className="text-orange-300 text-sm">
                          {goal.current} / {goal.target} {goal.unit}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-orange-500/20 rounded-full h-3 mb-2">
                    <div 
                      className="bg-orange-400 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-orange-300 text-sm text-right">
                    {goal.progress}% Complete
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Reference */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg p-6">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              Walking Routines Overview
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 font-semibold">Walking Type</th>
                    <th className="text-left py-3 px-4 font-semibold">Duration</th>
                    <th className="text-left py-3 px-4 font-semibold">Intensity</th>
                    <th className="text-left py-3 px-4 font-semibold">Steps</th>
                    <th className="text-left py-3 px-4 font-semibold">Pace</th>
                  </tr>
                </thead>
                <tbody>
                  {walkingActivities.map(activity => (
                    <tr key={activity.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-3 px-4 font-medium">{activity.name}</td>
                      <td className="py-3 px-4">{activity.duration}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-sm ${
                          activity.intensity === 'High' ? 'bg-red-500/20 text-red-300' :
                          activity.intensity === 'Moderate' ? 'bg-orange-500/20 text-orange-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {activity.intensity}
                        </span>
                      </td>
                      <td className="py-3 px-4">{activity.steps}</td>
                      <td className="py-3 px-4">{activity.pace}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Walking;