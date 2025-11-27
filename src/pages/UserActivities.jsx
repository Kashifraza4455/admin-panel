import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UsersContext';

const Activities = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users } = useUsers();
  
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const u = users.find(u => u.id === parseInt(id));
    if (u) {
      setUser(u);
      // Sample activities data - you can replace this with actual data from your context
      setActivities([
        {
          id: 1,
          name: 'Morning Meditation',
          type: 'Mindfulness',
          duration: '15 minutes',
          date: '2024-01-15',
          status: 'Completed',
          points: 50
        },
        {
          id: 2,
          name: 'Evening Walk',
          type: 'Exercise',
          duration: '30 minutes',
          date: '2024-01-15',
          status: 'Completed',
          points: 30
        },
        {
          id: 3,
          name: 'Breathing Exercise',
          type: 'Wellness',
          duration: '10 minutes',
          date: '2024-01-14',
          status: 'Completed',
          points: 20
        },
        {
          id: 4,
          name: 'Yoga Session',
          type: 'Exercise',
          duration: '45 minutes',
          date: '2024-01-14',
          status: 'Completed',
          points: 60
        },
        {
          id: 5,
          name: 'Reading Therapy',
          type: 'Mental Health',
          duration: '20 minutes',
          date: '2024-01-13',
          status: 'Completed',
          points: 40
        }
      ]);
    }
  }, [id, users]);

  const handleBackClick = () => {
    navigate(`/users/${id}`);
  };

  const getActivityTypeColor = (type) => {
    switch (type) {
      case 'Mindfulness': return 'bg-purple-500/20 text-purple-300';
      case 'Exercise': return 'bg-blue-500/20 text-blue-300';
      case 'Wellness': return 'bg-green-500/20 text-green-300';
      case 'Mental Health': return 'bg-pink-500/20 text-pink-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-red-500 font-semibold text-lg">User not found</p>
      </div>
    );
  }

  const totalPoints = activities.reduce((sum, activity) => sum + activity.points, 0);
  const completedActivities = activities.filter(activity => activity.status === 'Completed').length;

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 lg:mb-8">
          <div className="flex-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-white">
              Activities
            </h1>
            <p className="text-white/80 mt-1 lg:mt-2 text-sm lg:text-lg">
              For {user.name} • Track progress and accomplishments
            </p>
          </div>
          <button
            onClick={handleBackClick}
            className="inline-flex items-center justify-center gap-2 px-4 lg:px-6 py-2 lg:py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition border border-white/20 text-sm lg:text-base w-full lg:w-auto"
          >
            ← Back
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-pink-500/20">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl mb-2">🏆</div>
              <h3 className="text-white font-semibold mb-2 text-sm lg:text-base">Total Points</h3>
              <p className="text-pink-300 text-xl lg:text-3xl font-bold">{totalPoints}</p>
              <p className="text-white/60 text-xs lg:text-sm">Points earned</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-purple-500/20">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl mb-2">✅</div>
              <h3 className="text-white font-semibold mb-2 text-sm lg:text-base">Activities Completed</h3>
              <p className="text-purple-300 text-xl lg:text-3xl font-bold">{completedActivities}</p>
              <p className="text-white/60 text-xs lg:text-sm">Total activities</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-blue-500/20">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl mb-2">📊</div>
              <h3 className="text-white font-semibold mb-2 text-sm lg:text-base">Success Rate</h3>
              <p className="text-blue-300 text-xl lg:text-3xl font-bold">
                {activities.length > 0 ? Math.round((completedActivities / activities.length) * 100) : 0}%
              </p>
              <p className="text-white/60 text-xs lg:text-sm">Completion rate</p>
            </div>
          </div>
        </div>

        {/* Activities List */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-white/20 shadow-xl p-4 lg:p-8">
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6">Recent Activities</h2>
          
          {activities.length === 0 ? (
            <div className="text-center py-8 lg:py-12">
              <span className="text-3xl lg:text-4xl">📝</span>
              <p className="text-white/60 text-base lg:text-lg mt-3 lg:mt-4">No activities recorded yet.</p>
              <p className="text-white/40 text-sm mt-1 lg:mt-2">
                Activities will appear here as user completes them
              </p>
            </div>
          ) : (
            <div className="space-y-3 lg:space-y-4">
              {activities.map(activity => (
                <div
                  key={activity.id}
                  className="bg-gradient-to-br from-pink-500/5 to-rose-500/5 rounded-lg lg:rounded-xl p-4 lg:p-6 border border-pink-500/10 hover:border-pink-500/20 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 lg:gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-3 mb-2">
                        <h3 className="text-white font-bold text-base lg:text-lg">{activity.name}</h3>
                        <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${getActivityTypeColor(activity.type)} self-start sm:self-auto`}>
                          {activity.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-white/60 text-xs lg:text-sm">
                        <span className="flex items-center gap-1">
                          <span>⏱️</span>
                          <span>{activity.duration}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span>📅</span>
                          <span>{activity.date}</span>
                        </span>
                        <span className="text-green-400 flex items-center gap-1">
                          <span>✅</span>
                          <span>{activity.status}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 lg:gap-4 mt-2 md:mt-0">
                      <div className="text-center">
                        <span className="text-pink-300 font-bold text-lg lg:text-xl">{activity.points}</span>
                        <p className="text-white/60 text-xs">points</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;