import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usersApi, institutionsApi, studentsApi } from '../services/api';

interface DashboardStats {
  totalUsers?: number;
  totalInstitutions?: number;
  totalStudents?: number;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Fetch data based on user role
        if (user?.role === 'admin') {
          // Admin sees all stats
          const [usersResponse, institutionsResponse, studentsResponse] = await Promise.all([
            usersApi.getUsers({ limit: 1 }),
            institutionsApi.getInstitutions({ limit: 1 }),
            studentsApi.getStudents({ limit: 1 })
          ]);
          
          setStats({
            totalUsers: usersResponse.total,
            totalInstitutions: institutionsResponse.total,
            totalStudents: studentsResponse.total
          });
        } else if (user?.role === 'teacher') {
          // Teachers see student stats
          const studentsResponse = await studentsApi.getStudents({ limit: 1 });
          
          setStats({
            totalStudents: studentsResponse.total
          });
        } else if (user?.role === 'institution') {
          // Institutions see their students
          const studentsResponse = await studentsApi.getStudents({ 
            institution_id: user.id,
            limit: 1 
          });
          
          setStats({
            totalStudents: studentsResponse.total
          });
        }
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0118] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
        
        {error && (
          <div className="bg-red-500/20 text-red-300 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <div className="col-span-full bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-xl p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10">
            <h2 className="text-2xl font-semibold text-white mb-2">Welcome, {user?.name || 'User'}!</h2>
            <p className="text-gray-300">
              {user?.role === 'admin' && 'You have administrator access to the platform.'}
              {user?.role === 'teacher' && 'You can manage students and use AI tools.'}
              {user?.role === 'institution' && 'You can manage your institution profile and students.'}
              {user?.role === 'student' && 'You can view your academic progress and resources.'}
            </p>
          </div>
          
          {/* Stats Cards */}
          {user?.role === 'admin' && (
            <>
              <StatCard 
                title="Total Users" 
                value={stats.totalUsers || 0} 
                icon="👥" 
                color="from-blue-600/30 to-blue-800/30" 
              />
              
              <StatCard 
                title="Institutions" 
                value={stats.totalInstitutions || 0} 
                icon="🏫" 
                color="from-purple-600/30 to-purple-800/30" 
              />
              
              <StatCard 
                title="Students" 
                value={stats.totalStudents || 0} 
                icon="👨‍🎓" 
                color="from-pink-600/30 to-pink-800/30" 
              />
            </>
          )}
          
          {(user?.role === 'teacher' || user?.role === 'institution') && (
            <StatCard 
              title="Students" 
              value={stats.totalStudents || 0} 
              icon="👨‍🎓" 
              color="from-pink-600/30 to-pink-800/30" 
            />
          )}
          
          {/* Quick Actions */}
          <div className="col-span-full bg-[#0f0225] rounded-xl p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {user?.role === 'admin' && (
                <>
                  <ActionButton label="Manage Users" icon="👥" link="/users" />
                  <ActionButton label="Manage Institutions" icon="🏫" link="/institutions" />
                  <ActionButton label="Manage Students" icon="👨‍🎓" link="/students" />
                  <ActionButton label="AI Tools" icon="🤖" link="/ai-tools" />
                </>
              )}
              
              {user?.role === 'teacher' && (
                <>
                  <ActionButton label="View Students" icon="👨‍🎓" link="/students" />
                  <ActionButton label="AI Tools" icon="🤖" link="/ai-tools" />
                </>
              )}
              
              {user?.role === 'institution' && (
                <>
                  <ActionButton label="Manage Students" icon="👨‍🎓" link="/students" />
                  <ActionButton label="Institution Profile" icon="🏫" link="/profile" />
                </>
              )}
              
              {user?.role === 'student' && (
                <>
                  <ActionButton label="View Scores" icon="📊" link="/scores" />
                  <ActionButton label="Learning Resources" icon="📚" link="/resources" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-xl p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-300">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value.toLocaleString()}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
};

interface ActionButtonProps {
  label: string;
  icon: string;
  link: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, icon, link }) => {
  return (
    <a 
      href={link} 
      className="flex flex-col items-center justify-center p-4 bg-[#1a0b3b] rounded-lg border border-purple-500/20 hover:bg-purple-900/20 transition-colors"
    >
      <span className="text-2xl mb-2">{icon}</span>
      <span className="text-sm text-gray-300">{label}</span>
    </a>
  );
};

export default Dashboard;