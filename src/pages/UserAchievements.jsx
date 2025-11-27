import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UsersContext';

const Achievements = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users } = useUsers();
  
  const [user, setUser] = useState(null);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const u = users.find(u => u.id === parseInt(id));
    if (u) {
      setUser(u);
      // Sample achievements data
      setAchievements([
        {
          id: 1,
          title: '7-Day Streak Champion',
          description: 'Completed activities for 7 consecutive days',
          icon: '🔥',
          category: 'Consistency',
          earnedDate: '2024-01-15',
          points: 100,
          status: 'earned',
          level: 'Gold'
        },
        {
          id: 2,
          title: 'Breathing Master',
          description: 'Completed 20+ breathing exercises',
          icon: '🌬️',
          category: 'Wellness',
          earnedDate: '2024-01-14',
          points: 75,
          status: 'earned',
          level: 'Silver'
        },
        {
          id: 3,
          title: 'Walking Warrior',
          description: 'Walked 50+ kilometers total',
          icon: '🚶‍♂️',
          category: 'Fitness',
          earnedDate: '2024-01-13',
          points: 150,
          status: 'earned',
          level: 'Gold'
        },
        {
          id: 4,
          title: 'Early Riser',
          description: 'Completed 10+ morning activities',
          icon: '🌅',
          category: 'Routine',
          earnedDate: '2024-01-12',
          points: 50,
          status: 'earned',
          level: 'Bronze'
        },
        {
          id: 5,
          title: 'Meditation Guru',
          description: 'Meditated for 500+ minutes total',
          icon: '🧘‍♂️',
          category: 'Mindfulness',
          earnedDate: null,
          points: 200,
          status: 'locked',
          level: 'Platinum',
          progress: 65
        },
        {
          id: 6,
          title: 'Social Butterfly',
          description: 'Shared 5+ posts with community',
          icon: '👥',
          category: 'Social',
          earnedDate: null,
          points: 80,
          status: 'locked',
          level: 'Silver',
          progress: 40
        }
      ]);
    }
  }, [id, users]);

  const handleBackClick = () => {
    navigate(`/users/${id}`);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Bronze': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Silver': return 'bg-gray-400/20 text-gray-300 border-gray-400/30';
      case 'Gold': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Platinum': return 'bg-blue-400/20 text-blue-300 border-blue-400/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-red-500 font-semibold text-lg">User not found</p>
      </div>
    );
  }

  const earnedAchievements = achievements.filter(a => a.status === 'earned');
  const totalPoints = earnedAchievements.reduce((sum, achievement) => sum + achievement.points, 0);

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 lg:mb-8">
          <div className="flex-1">
            <h1 className="text-2xl lg:text-4xl font-bold text-white">
              Achievements & Milestones
            </h1>
            <p className="text-white/80 mt-1 lg:mt-2 text-sm lg:text-lg">
              For {user.name} • Celebrating progress and accomplishments
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
          <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-yellow-500/20">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl mb-2">🏆</div>
              <h3 className="text-white font-semibold mb-2 text-sm lg:text-base">Achievements Earned</h3>
              <p className="text-yellow-300 text-xl lg:text-3xl font-bold">{earnedAchievements.length}</p>
              <p className="text-white/60 text-xs lg:text-sm">Out of {achievements.length} total</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-amber-500/20">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl mb-2">⭐</div>
              <h3 className="text-white font-semibold mb-2 text-sm lg:text-base">Total Points</h3>
              <p className="text-amber-300 text-xl lg:text-3xl font-bold">{totalPoints}</p>
              <p className="text-white/60 text-xs lg:text-sm">Points collected</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-orange-500/20">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl mb-2">📈</div>
              <h3 className="text-white font-semibold mb-2 text-sm lg:text-base">Completion Rate</h3>
              <p className="text-orange-300 text-xl lg:text-3xl font-bold">
                {achievements.length > 0 ? Math.round((earnedAchievements.length / achievements.length) * 100) : 0}%
              </p>
              <p className="text-white/60 text-xs lg:text-sm">Of all achievements</p>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-white/20 shadow-xl p-4 lg:p-8">
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6">Achievements Collection</h2>
          
          {achievements.length === 0 ? (
            <div className="text-center py-8 lg:py-12">
              <span className="text-3xl lg:text-4xl">🏅</span>
              <p className="text-white/60 text-base lg:text-lg mt-3 lg:mt-4">No achievements available yet.</p>
              <p className="text-white/40 text-sm mt-1 lg:mt-2">
                Achievements will unlock as user progresses
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {achievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`rounded-xl lg:rounded-2xl p-4 lg:p-6 border transition-all duration-300 ${
                    achievement.status === 'earned'
                      ? 'bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-yellow-500/20 hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/10'
                      : 'bg-gradient-to-br from-gray-500/5 to-gray-600/5 border-gray-500/10 hover:border-gray-500/20 opacity-70'
                  }`}
                >
                  <div className="text-center">
                    {/* Achievement Icon */}
                    <div className={`text-3xl lg:text-4xl mb-3 lg:mb-4 ${achievement.status === 'locked' ? 'opacity-50' : ''}`}>
                      {achievement.icon}
                    </div>

                    {/* Level Badge */}
                    <div className={`inline-block px-2 lg:px-3 py-1 rounded-full text-xs font-medium border mb-2 lg:mb-3 ${getLevelColor(achievement.level)}`}>
                      {achievement.level}
                    </div>

                    {/* Title & Description */}
                    <h3 className={`font-bold text-base lg:text-lg mb-1 lg:mb-2 ${achievement.status === 'earned' ? 'text-white' : 'text-white/60'}`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-xs lg:text-sm mb-3 lg:mb-4 ${achievement.status === 'earned' ? 'text-white/70' : 'text-white/40'}`}>
                      {achievement.description}
                    </p>

                    {/* Points */}
                    <div className="flex justify-center items-center gap-2 mb-2 lg:mb-3">
                      <span className="text-yellow-400 text-base lg:text-lg">⭐</span>
                      <span className={`font-bold text-sm lg:text-base ${achievement.status === 'earned' ? 'text-yellow-300' : 'text-yellow-300/50'}`}>
                        {achievement.points} pts
                      </span>
                    </div>

                    {/* Status */}
                    {achievement.status === 'earned' ? (
                      <div className="bg-green-500/20 text-green-300 px-2 lg:px-3 py-1 rounded-full text-xs font-medium">
                        ✅ Earned {achievement.earnedDate}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="bg-gray-500/20 text-gray-300 px-2 lg:px-3 py-1 rounded-full text-xs font-medium">
                          🔒 Locked
                        </div>
                        {achievement.progress && (
                          <div className="space-y-1">
                            <div className="w-full bg-gray-500/20 rounded-full h-2">
                              <div 
                                className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${achievement.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-white/60 text-xs">{achievement.progress}% complete</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Milestones */}
        {earnedAchievements.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-white/20 shadow-xl p-4 lg:p-8 mt-6 lg:mt-8">
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6">Recent Milestones</h2>
            <div className="space-y-3 lg:space-y-4">
              {earnedAchievements.slice(0, 3).map(achievement => (
                <div
                  key={achievement.id}
                  className="bg-gradient-to-br from-yellow-500/5 to-amber-500/5 rounded-lg lg:rounded-xl p-3 lg:p-4 border border-yellow-500/10"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
                    <div className="text-xl lg:text-2xl flex-shrink-0">{achievement.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white text-sm lg:text-base">{achievement.title}</h4>
                      <p className="text-white/60 text-xs lg:text-sm mt-1">{achievement.description}</p>
                      <p className="text-yellow-300 text-xs mt-1 lg:mt-2">
                        Earned on {achievement.earnedDate} • {achievement.points} points
                      </p>
                    </div>
                    <div className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(achievement.level)} self-start sm:self-auto`}>
                      {achievement.level}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;