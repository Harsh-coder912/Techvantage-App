import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { StudentDashboard } from './components/student/StudentDashboard';
import { InstitutionDashboard } from './components/institution/InstitutionDashboard';
import { authApi, usersApi } from './services/api';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'institution' | 'teacher' | 'admin';
  institution?: string;
  full_name?: string;
  username?: string;
}

type AppState = 'landing' | 'login' | 'dashboard';

export default function App() {
  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (authApi.isAuthenticated()) {
        try {
          const userData = await usersApi.getCurrentUser();
          setUser({
            id: userData.id,
            email: userData.email,
            name: userData.full_name || userData.username,
            role: userData.role,
            institution: userData.institution,
            full_name: userData.full_name,
            username: userData.username
          });
          setAppState('dashboard');
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          authApi.logout();
        }
      }
    };

    checkAuth();
  }, []);
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

  const handleLogin = async (role: 'student' | 'institution' | 'teacher' | 'admin', credentials: { username: string, password: string }) => {
    try {
      // Call the backend API for authentication
      await authApi.login(credentials.username, credentials.password);
      
      // Fetch the current user data
      const userData = await usersApi.getCurrentUser();
      
      setUser({
        id: userData.id,
        email: userData.email,
        name: userData.full_name || userData.username,
        role: userData.role,
        institution: userData.institution,
        full_name: userData.full_name,
        username: userData.username
      });
      
      setAppState('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (could set an error state here)
    }
  };

  const handleLogout = () => {
    // Call the API logout function to clear token
    authApi.logout();
    
    setUser(null);
    setSelectedRole(null);
    setAppState('landing');
  };

  const handleBackToLanding = () => {
    setAppState('landing');
    setSelectedRole(null);
  };

  return (
    <AuthProvider>
      <Router>
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

          {/* Main Content */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage onGetStarted={handleGetStarted} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected Routes */}
             <Route path="/dashboard" element={
               <ProtectedRoute>
                 <Layout>
                   <Dashboard />
                 </Layout>
               </ProtectedRoute>
             } />
             
             <Route path="/profile" element={
               <ProtectedRoute>
                 <Layout>
                   <Profile />
                 </Layout>
               </ProtectedRoute>
             } />
             
             {/* Role-specific Routes */}
             <Route path="/admin/*" element={
               <ProtectedRoute requiredRoles={['admin']}>
                 <Layout>
                   {/* Admin routes will be implemented here */}
                   <div>Admin Area</div>
                 </Layout>
               </ProtectedRoute>
             } />
             
             <Route path="/teacher/*" element={
               <ProtectedRoute requiredRoles={['teacher', 'admin']}>
                 <Layout>
                   {/* Teacher routes will be implemented here */}
                   <div>Teacher Area</div>
                 </Layout>
               </ProtectedRoute>
             } />
             
             {/* Legacy Routes - will be migrated */}
             <Route path="/student-dashboard" element={
               <ProtectedRoute requiredRoles={['student']}>
                 <Layout>
                   <StudentDashboard user={user} onLogout={handleLogout} />
                 </Layout>
               </ProtectedRoute>
             } />
             
             <Route path="/institution-dashboard" element={
               <ProtectedRoute requiredRoles={['institution']}>
                 <Layout>
                   <InstitutionDashboard user={user} onLogout={handleLogout} />
                 </Layout>
               </ProtectedRoute>
             } />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}