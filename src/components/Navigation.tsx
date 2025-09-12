import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-purple-500/20 text-white' : 'text-gray-300 hover:bg-purple-500/10';
  };

  // Define navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { path: '/dashboard', label: 'Dashboard', icon: '📊' },
      { path: '/profile', label: 'Profile', icon: '👤' },
    ];

    const roleSpecificItems = {
      admin: [
        { path: '/admin/users', label: 'Users', icon: '👥' },
        { path: '/admin/institutions', label: 'Institutions', icon: '🏫' },
      ],
      teacher: [
        { path: '/teacher/students', label: 'Students', icon: '🧑‍🎓' },
        { path: '/teacher/lessons', label: 'Lessons', icon: '📚' },
        { path: '/teacher/ai-tools', label: 'AI Tools', icon: '🤖' },
      ],
      institution: [
        { path: '/institution/teachers', label: 'Teachers', icon: '👨‍🏫' },
        { path: '/institution/students', label: 'Students', icon: '🧑‍🎓' },
      ],
      student: [
        { path: '/student/courses', label: 'Courses', icon: '📝' },
        { path: '/student/progress', label: 'Progress', icon: '📈' },
      ],
    };

    return [...commonItems, ...(roleSpecificItems[user.role] || [])];
  };

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-[#0f0225] border-r border-purple-500/20 shadow-lg shadow-purple-500/10 z-40">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">DP</span>
          </div>
          <span className="text-xl font-bold text-white">DigiPratibha</span>
        </div>

        <div className="mb-6">
          <div className="flex items-center space-x-3 p-3 bg-[#1a0b3b] rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {user?.full_name?.charAt(0) || user?.username?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <div className="text-sm font-medium text-white">{user?.full_name || user?.username}</div>
              <div className="text-xs text-gray-400 capitalize">{user?.role}</div>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          {getNavItems().map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path)}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <button
          onClick={() => logout()}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#1a0b3b] hover:bg-[#2a1b4b] text-white rounded-lg transition-colors"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;