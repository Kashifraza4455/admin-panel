import { useState, useEffect } from 'react';

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({});

  // Sample data matching your image structure
  const sampleData = [
    { 
      id: 1, 
      name: 'Al Ali raza', 
      points: 0,
      rank: 1,
      avatar: '👨‍💼'
    },
    { 
      id: 2, 
      name: 'KR kashif raza', 
      points: 0,
      rank: 2,
      avatar: '👨‍🎓'
    },
    { 
      id: 3, 
      name: ' AA ali ahmed', 
      points: 0,
      rank: 3,
      avatar: '👨‍💻'
    }
  ];

  const sampleUserStats = {
    streak: 7,
    xp: 2000,
    freedomPoints: 2500,
    achievements: {
      completed: 1,
      total: 2
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLeaderboardData(sampleData);
        setUserStats(sampleUserStats);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLeaderboardData(sampleData);
        setUserStats(sampleUserStats);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-xl">Loading leaderboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Recovery Journey Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">Recovery Journey</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* 7 Day Streak Card */}
            <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">🔥</div>
                <div className="text-blue-300 text-sm">Current Streak</div>
              </div>
              <div className="text-white font-bold text-lg mb-2">7 Day Streak</div>
              <div className="text-gray-300 text-sm">Day Streak</div>
            </div>

            {/* Freedom Card */}
            <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">🏆</div>
                <div className="text-green-300 text-sm">{userStats.xp} XP</div>
              </div>
              <div className="text-white font-bold text-lg mb-2">0</div>
              <div className="text-gray-300 text-sm">Total XP</div>
            </div>

            {/* Achievements Card */}
            <div className="bg-purple-500/20 border border-purple-400/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">⭐</div>
                <div className="text-purple-300 text-sm">{userStats.freedomPoints} XP</div>
              </div>
              <div className="text-white font-bold text-lg mb-2">
                {userStats.achievements.completed}/{userStats.achievements.total}
              </div>
              <div className="text-gray-300 text-sm">Achievements</div>
            </div>
          </div>

        </div>

        {/* Horizontal Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Leaderboard Section */}
        <div className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">Rank</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">User</th>
                  <th className="text-right py-4 px-6 text-gray-300 font-semibold">Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user) => (
                  <tr 
                    key={user.id} 
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                          user.rank === 1 ? 'bg-yellow-500/20 text-yellow-300' :
                          user.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
                          user.rank === 3 ? 'bg-orange-500/20 text-orange-300' :
                          'bg-white/10 text-gray-300'
                        }`}>
                          {user.rank}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="text-xl">{user.avatar}</div>
                        <div>
                          <div className="text-white font-medium">{user.name}</div>
                          <div className="text-gray-400 text-sm">
                            {user.name.split(' ').map(word => word[0]).join('')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="text-white font-bold text-lg">{user.points}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {leaderboardData.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏆</div>
              <div className="text-gray-400 text-xl">No leaderboard data available</div>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          {leaderboardData.length} users in leaderboard • Updated just now
        </div>
      </div>
    </div>
  );
}