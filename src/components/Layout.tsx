import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0118] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0118]">
      {user && <Navigation />}
      
      <div className={user ? 'pl-64' : ''}>
        {/* Header for authenticated users */}
        {user && (
          <header className="sticky top-0 z-30 bg-[#0a0118]/95 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-500/10">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-white">
                  {window.location.pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
                </h1>
                
                <div className="flex items-center space-x-4">
                  {/* Notification bell icon */}
                  <button className="p-2 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </header>
        )}
        
        {/* Main content */}
        <main className={user ? 'p-6' : ''}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;