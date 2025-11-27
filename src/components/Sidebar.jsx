import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button - Now on Right Side */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-indigo-600 text-white shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/70 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        w-72 h-screen bg-gray-900/95 backdrop-blur-xl border-r border-white/10 text-white 
        fixed left-0 top-0 overflow-y-auto z-50 transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:bg-gray-900/80
      `}>
        <div className="p-6 border-b border-white/10 sticky top-0 bg-gray-900/95 backdrop-blur-xl z-10">
          <h1 className="text-xl font-bold">Admin</h1>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/" 
                onClick={handleLinkClick}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                  isActive('/') || location.pathname === '/dashboard'
                    ? 'bg-indigo-500/20 text-indigo-300' 
                    : 'hover:bg-white/10 text-gray-300'
                }`}
              >
                <span>📊</span> 
                <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link 
                to="/users" 
                onClick={handleLinkClick}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                  isActive('/users')
                    ? 'bg-indigo-500/20 text-indigo-300' 
                    : 'hover:bg-white/10 text-gray-300'
                }`}
              >
                <span>👥</span> 
                <span>Users</span>
              </Link>
            </li>

            {/* ✅ Academy Tab */}
            <li>
              <Link 
                to="/academy" 
                onClick={handleLinkClick}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                  isActive('/academy')
                    ? 'bg-indigo-500/20 text-indigo-300' 
                    : 'hover:bg-white/10 text-gray-300'
                }`}
              >
                <span>🎓</span> 
                <span>Academy</span>
              </Link>
            </li>

            {/* ✅ NEW: Leaderboard Tab */}
            <li>
              <Link 
                to="/leaderboard" 
                onClick={handleLinkClick}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                  isActive('/leaderboard')
                    ? 'bg-indigo-500/20 text-indigo-300' 
                    : 'hover:bg-white/10 text-gray-300'
                }`}
              >
                <span>🏆</span> 
                <span>Leaderboard</span>
              </Link>
            </li>

            {/* Settings with Dropdown */}
            <li>
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors duration-200 ${
                  isActive('/privacy') || isActive('/terms') || isActive('/settings')
                    ? 'bg-indigo-500/20 text-indigo-300 border-l-4 border-indigo-400' 
                    : 'hover:bg-white/10 text-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span>⚙️</span>
                  <span>Settings</span>
                </div>
                <span className={`transform transition-transform duration-200 ${
                  isSettingsOpen ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </button>

              {/* Dropdown Menu */}
              {isSettingsOpen && (
                <ul className="mt-2 ml-4 space-y-1 border-l border-white/20 pl-3">
                  <li>
                    <Link 
                      to="/privacy-policy"
                      onClick={handleLinkClick}
                      className={`flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 ${
                        isActive('/privacy-policy')
                          ? 'bg-indigo-500/20 text-indigo-300' 
                          : 'hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                      <span className="text-sm">Privacy Policy</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/terms-of-use"
                      onClick={handleLinkClick}
                      className={`flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 ${
                        isActive('/terms-of-use')
                          ? 'bg-indigo-500/20 text-indigo-300' 
                          : 'hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                      <span className="text-sm">Terms of Use</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}