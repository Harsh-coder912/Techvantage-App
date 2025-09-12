import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usersApi } from '../services/api';

const Profile: React.FC = () => {
  const { user, isLoading } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    username: user?.username || ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setUpdateLoading(true);
    
    try {
      if (!user?.id) throw new Error('User ID not found');
      
      await usersApi.updateUser(user.id, formData);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update profile');
    } finally {
      setUpdateLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0118] p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Your Profile</h1>
        
        {error && (
          <div className="bg-red-500/20 text-red-300 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-500/20 text-green-300 p-4 rounded-lg mb-6">
            {success}
          </div>
        )}
        
        <div className="bg-[#0f0225] rounded-xl p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="full_name" className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full rounded-md border border-purple-500/30 bg-[#1a0b3b] px-4 py-3 text-white placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>
                
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full rounded-md border border-purple-500/30 bg-[#1a0b3b] px-4 py-3 text-white placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-md border border-purple-500/30 bg-[#1a0b3b] px-4 py-3 text-white placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={updateLoading}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-70"
                  >
                    {updateLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-3 px-4 bg-[#1a0b3b] text-white rounded-md hover:bg-[#2a1b4b] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-3xl">
                    {user?.full_name?.charAt(0) || user?.username?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-400">Full Name</p>
                  <p className="text-lg font-medium text-white">{user?.full_name || 'Not set'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-400">Username</p>
                  <p className="text-lg font-medium text-white">{user?.username}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-400">Email</p>
                  <p className="text-lg font-medium text-white">{user?.email}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-400">Role</p>
                  <p className="text-lg font-medium text-white capitalize">{user?.role}</p>
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md hover:from-purple-700 hover:to-pink-700 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;