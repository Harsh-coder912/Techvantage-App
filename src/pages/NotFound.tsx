import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0118] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0f0225] rounded-xl p-8 border border-purple-500/20 shadow-lg shadow-purple-500/10 text-center">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
        
        <p className="text-gray-300 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col space-y-4">
          <Link 
            to="/" 
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md hover:from-purple-700 hover:to-pink-700 transition-colors"
          >
            Return to Home
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

export default NotFound;