import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { StudentDashboard } from './components/student/StudentDashboard';
import { InstitutionDashboard } from './components/institution/InstitutionDashboard';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'institution';
  institution?: string;
}

type AppState = 'landing' | 'login' | 'dashboard';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [appState, setAppState] = useState<AppState>('landing');
  const [selectedRole, setSelectedRole] = useState<'student' | 'institution' | null>(null);

  // Apply dark theme class to document for consistent neon background
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  const handleGetStarted = (role: 'student' | 'institution') => {
    setSelectedRole(role);
    setAppState('login');
  };

  const handleLogin = (role: 'student' | 'institution', userData: any) => {
    setUser({
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role: role,
      institution: userData.institution
    });
    setAppState('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedRole(null);
    setAppState('landing');
  };

  const handleBackToLanding = () => {
    setAppState('landing');
    setSelectedRole(null);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Consistent Black Neon Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-[#0a0118]"></div>
        
        {/* Neon gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Radial gradients */}
        <div className="absolute inset-0">
          <div className="w-full h-full" style={{
            background: `
              radial-gradient(ellipse at top, rgba(139, 92, 246, 0.1) 0%, transparent 70%),
              radial-gradient(ellipse at bottom right, rgba(236, 72, 153, 0.1) 0%, transparent 70%),
              radial-gradient(ellipse at center left, rgba(99, 102, 241, 0.08) 0%, transparent 70%)
            `
          }}></div>
        </div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Consistent Titlebar/Header for authenticated users */}
      {user && (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0118]/95 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-500/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">DP</span>
                  </div>
                  <span className="text-xl font-bold gradient-text">DigiPratibha</span>
                </div>
                <div className="text-sm text-foreground/60">
                  {user.role === 'student' ? 'Student Portal' : 'Institution Dashboard'}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-sm text-foreground/80">
                  Welcome, <span className="text-purple-400 font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg border border-purple-500/30 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <div className={user ? "pt-20" : ""}>
        {/* Show landing page */}
        {appState === 'landing' && <LandingPage onGetStarted={handleGetStarted} />}

        {/* Show login page */}
        {appState === 'login' && (
          <LoginPage 
            onLogin={handleLogin} 
            defaultRole={selectedRole}
            onBack={handleBackToLanding}
          />
        )}

        {/* Render appropriate dashboard based on user role */}
        {user?.role === 'student' && <StudentDashboard user={user} onLogout={handleLogout} />}
        {user?.role === 'institution' && <InstitutionDashboard user={user} onLogout={handleLogout} />}

        {/* Fallback */}
        {!appState && <LandingPage onGetStarted={handleGetStarted} />}
      </div>
    </div>
  );
}