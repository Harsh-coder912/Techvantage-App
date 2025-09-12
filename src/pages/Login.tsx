import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0118] p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-[#0f0225] p-8 shadow-lg shadow-purple-500/10 border border-purple-500/20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-400">Sign in to your account</p>
        </div>
        
        {error && (
          <div className="rounded-md bg-red-500/20 p-4 text-sm text-red-300">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username or Email
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full rounded-md border border-purple-500/30 bg-[#1a0b3b] px-4 py-3 text-white placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                placeholder="Enter your username or email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-purple-500/30 bg-[#1a0b3b] px-4 py-3 text-white placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                placeholder="Enter your password"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-600 bg-[#1a0b3b] text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
                Forgot your password?
              </a>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-pink-600 py-3 px-4 text-sm font-medium text-white hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-purple-400 hover:text-purple-300">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;