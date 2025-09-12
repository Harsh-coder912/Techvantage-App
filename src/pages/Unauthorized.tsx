import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Unauthorized: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a0118] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0f0225] rounded-xl p-8 border border-red-500/20 shadow-lg shadow-red-500/10 text-center">
        <div className="text-6xl mb-6">🔒</div>
        <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
        
        <p className="text-gray-300 mb-6">
          Sorry, you don't have permission to access this page. This area requires higher privileges.
        </p>
        
        <div className="text-sm text-gray-400 mb-8">
          You are signed in as: <span className="font-medium text-white">{user?.name || 'Unknown User'}</span>
          <br />
          Role: <span className="font-medium text-white capitalize">{user?.role || 'Unknown'}</span>
        </div>
        
        <div className="flex flex-col space-y-4">
          <Link 
            to="/dashboard" 
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md hover:from-purple-700 hover:to-pink-700 transition-colors"
          >
            Return to Dashboard
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="w-full py-3 px-4 bg-[#1a0b3b] text-white rounded-md hover:bg-[#2a1b4b] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;