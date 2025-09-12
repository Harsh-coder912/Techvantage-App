import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    role: 'student' // Default role
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registrationData } = formData;
      
      await register(registrationData);
      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0118] p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-[#0f0225] p-8 shadow-lg shadow-purple-500/10 border border-purple-500/20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="mt-2 text-sm text-gray-400">Join our educational platform</p>
        </div>
        
        {error && (
          <div className="rounded-md bg-red-500/20 p-4 text-sm text-red-300">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                required
                value={formData.full_name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-purple-500/30 bg-[#1a0b3b] px-4 py-3 text-white placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-purple-500/30 bg-[#1a0b3b] px-4 py-3 text-white placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                placeholder="Choose a username"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-purple-500/30 bg-[#1a0b3b] px-4 py-3 text-white placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                placeholder="Enter your email"
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
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-purple-500/30 bg-[#1a0b3b] px-4 py-3 text-white placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                placeholder="Create a password"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-purple-500/30 bg-[#1a0b3b] px-4 py-3 text-white placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                placeholder="Confirm your password"
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-300">
                Role
              </label>
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-purple-500/30 bg-[#1a0b3b] px-4 py-3 text-white placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="institution">Institution</option>
              </select>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-pink-600 py-3 px-4 text-sm font-medium text-white hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;