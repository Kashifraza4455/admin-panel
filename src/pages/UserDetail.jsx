import { useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../context/UsersContext";
import { useState, useEffect } from "react";

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, setUsers } = useUsers();

  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");
  const [targetDays, setTargetDays] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const u = users.find(u => u.id === parseInt(id));
    if (u) {
      setUser(u);
      setStatus(u.status);
      setTargetDays(u.targetDays || 0);
    }
  }, [id, users]);

  // Existing functions remain the same...
  const handleStatusChange = () => {
    setUsers(prev =>
      prev.map(u =>
        u.id === user.id
          ? { ...u, status: status, targetDays: targetDays }
          : u
      )
    );
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setStatus(user.status);
    setTargetDays(user.targetDays || 0);
  };

  const handleBlockUser = () => {
    setUsers(prev =>
      prev.map(u =>
        u.id === user.id
          ? { ...u, isBlocked: !u.isBlocked }
          : u
      )
    );
    
    setUser(prev => ({ ...prev, isBlocked: !prev.isBlocked }));
  };

  const handleDeleteUser = () => {
    if (window.confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
      setUsers(prev => prev.filter(u => u.id !== user.id));
      navigate('/users');
    }
  };

  const handleRecoveriesClick = () => {
    navigate(`/users/${user.id}/recoveries`);
  };

  const handlePostsClick = () => {
    navigate(`/users/${user.id}/posts`);
  };

  const handleFinancialClick = () => {
    navigate(`/users/${user.id}/financial`);
  };

  // ✅ Breathing Activities Handler
  const handleBreathingClick = () => {
    navigate(`/users/${user.id}/breathing`);
  };

  // ✅ Walking Activities Handler
  const handleWalkingClick = () => {
    navigate(`/users/${user.id}/walking`);
  };

  // ✅ Activities Handler
  const handleActivitiesClick = () => {
    navigate(`/users/${user.id}/activities`);
  };

  // ✅ NEW: Achievements Handler
  const handleAchievementsClick = () => {
    navigate(`/users/${user.id}/achievements`);
  };

  // ✅ Privacy Policy Handler
  const handlePrivacyPolicyClick = () => {
    navigate(`/users/${user.id}/privacy-policy`);
  };

  if (!user) return <p className="p-6 text-red-500 font-semibold">User not found</p>;

  const remainingDays = status === "Recovered" ? 0 : Math.max(targetDays - user.days, 0);
  const overDays = status === "Recovered" ? Math.max(user.days - targetDays, 0) : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg">
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-indigo-300">
            {user.name} - Details
          </h1>
          {user.isBlocked && (
            <span className="px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/30 rounded-full text-sm font-semibold">
              Blocked
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {!isEditing ? (
            <>
              <button
                onClick={handleEditClick}
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition"
              >
                Edit User
              </button>
              
              <button
                onClick={handleBlockUser}
                className={`px-4 py-2 rounded-lg transition ${
                  user.isBlocked 
                    ? 'bg-yellow-600 hover:bg-yellow-700' 
                    : 'bg-orange-600 hover:bg-orange-700'
                } text-white`}
              >
                {user.isBlocked ? 'Unblock User' : 'Block User'}
              </button>
              
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
              >
                Delete User
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleStatusChange}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancelClick}
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* User Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <div className="p-4 bg-white/5 rounded-xl border border-white/10 shadow-inner space-y-3">
          <h2 className="text-xl font-semibold text-indigo-300 mb-3">Basic Information</h2>
          <p><span className="font-semibold text-white">ID:</span> {user.id}</p>
          <p><span className="font-semibold text-white">Days Completed:</span> {user.days}</p>
          <p><span className="font-semibold text-white">Email:</span> {user.email || 'N/A'}</p>
          <p><span className="font-semibold text-white">Join Date:</span> {user.joinDate || 'N/A'}</p>
        </div>

        {/* Status & Target Days */}
        <div className="p-4 bg-white/5 rounded-xl border border-white/10 shadow-inner space-y-4">
          <h2 className="text-xl font-semibold text-indigo-300 mb-3">Recovery Status</h2>
          
          <div className="space-y-2">
            <label className="font-semibold text-white block">Status:</label>
            {isEditing ? (
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-white/20 appearance-none cursor-pointer"
              >
                <option value="Recovered" className="bg-gray-800 text-white">Recovered</option>
                <option value="Not Recovered" className="bg-gray-800 text-white">Not Recovered</option>
              </select>
            ) : (
              <div className={`px-3 py-2 rounded-lg ${
                status === "Recovered" ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"
              }`}>
                {status}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-white block">Target Days:</label>
            {isEditing ? (
              <input
                type="number"
                value={targetDays}
                onChange={e => setTargetDays(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-white/20 placeholder-gray-400"
                min="0"
                placeholder="Enter target days"
              />
            ) : (
              <div className="px-3 py-2 rounded-lg bg-white/10 text-white">
                {targetDays} days
              </div>
            )}
          </div>
        </div>

        {/* Progress & Analytics */}
        <div className="p-4 bg-white/5 rounded-xl border border-white/10 shadow-inner space-y-3">
          <h2 className="text-xl font-semibold text-indigo-300 mb-3">Progress Analytics</h2>
          
          {status === "Recovered" ? (
            <>
              <p><span className="font-semibold text-green-300">Recovered in:</span> {user.days} days</p>
              {overDays > 0 ? (
                <p className="text-red-400"><span className="font-semibold">Over target by:</span> {overDays} days</p>
              ) : (
                <p className="text-green-400"><span className="font-semibold">Recovered before target by:</span> {Math.max(targetDays - user.days, 0)} days</p>
              )}
            </>
          ) : (
            <p className="text-yellow-300"><span className="font-semibold">Remaining days:</span> {remainingDays}</p>
          )}
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-white mb-1">
              <span>Progress</span>
              <span>{user.days}/{targetDays} days</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: targetDays > 0 ? `${Math.min((user.days / targetDays) * 100, 100)}%` : '0%' 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Activities Section */}
      {status === "Recovered" && user.activities && user.activities.length > 0 && (
        <div className="p-4 bg-white/5 rounded-xl border border-white/10 shadow-inner">
          <h2 className="text-xl font-semibold text-indigo-300 mb-3">
            Activities that helped recovery
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {user.activities.map((act, i) => (
              <li key={i} className="px-3 py-2 bg-white/10 rounded-lg text-gray-200 hover:bg-white/20 transition">
                {act}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ✅ Full Width Buttons - WITH ACHIEVEMENTS BUTTON ADDED */}
      <div className="space-y-4">
        {/* Recovery History Button */}
        <button
          onClick={handleRecoveriesClick}
          className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl border border-white/20 flex items-center justify-center gap-3"
        >
          <span className="text-2xl">📊</span>
          View Recovery History & Analytics
        </button>

        {/* Posts Button */}
        <button
          onClick={handlePostsClick}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl border border-white/20 flex items-center justify-center gap-3"
        >
          <span className="text-2xl">📝</span>
          View User Posts & Updates
        </button>

        {/* Financial Summary Button */}
        <button
          onClick={handleFinancialClick}
          className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl border border-white/20 flex items-center justify-center gap-3"
        >
          <span className="text-2xl">💰</span>
          View Financial Summary & Expenses
        </button>

        {/* Breathing Activities Button */}
        <button
          onClick={handleBreathingClick}
          className="w-full py-4 px-6 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl border border-white/20 flex items-center justify-center gap-3"
        >
          <span className="text-2xl">🌬️</span>
          Breathing Activities & Exercises
        </button>

        {/* Walking Activities Button */}
        <button
          onClick={handleWalkingClick}
          className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl border border-white/20 flex items-center justify-center gap-3"
        >
          <span className="text-2xl">🚶‍♂️</span>
          Walking Activities & Progress
        </button>

        {/* ✅ NEW: Achievements Button */}
        <button
          onClick={handleAchievementsClick}
          className="w-full py-4 px-6 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl border border-white/20 flex items-center justify-center gap-3"
        >
          <span className="text-2xl">🏅</span>
          View Achievements & Milestones
        </button>

        {/* Activities Button */}
        <button
          onClick={handleActivitiesClick}
          className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl border border-white/20 flex items-center justify-center gap-3"
        >
          <span className="text-2xl">🏆</span>
          View User Activities & Progress
        </button>

      </div>

      {/* Warning for Blocked Users */}
      {user.isBlocked && (
        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
          <p className="text-red-300 text-center font-semibold">
            ⚠️ This user is currently blocked and may have restricted access.
          </p>
        </div>
      )}
    </div>
  );
}