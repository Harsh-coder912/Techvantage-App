import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Define base API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Define token storage key
const TOKEN_KEY = 'techvantage_auth_token';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear token and redirect to login
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/login';
      return Promise.reject(error);
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (username: string, password: string) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await apiClient.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    const { access_token } = response.data;
    localStorage.setItem(TOKEN_KEY, access_token);
    
    return response.data;
  },
  
  register: async (userData: any) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};

// Users API
export const usersApi = {
  getCurrentUser: async () => {
    const response = await apiClient.get('/users/me');
    return response.data;
  },
  
  getUsers: async (params?: any) => {
    const response = await apiClient.get('/users', { params });
    return response.data;
  },
  
  getUser: async (id: string) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },
  
  updateUser: async (id: string, userData: any) => {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  },
  
  deleteUser: async (id: string) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },
};

// Institutions API
export const institutionsApi = {
  getInstitutions: async (params?: any) => {
    const response = await apiClient.get('/institutions', { params });
    return response.data;
  },
  
  getInstitution: async (id: string) => {
    const response = await apiClient.get(`/institutions/${id}`);
    return response.data;
  },
  
  createInstitution: async (institutionData: any) => {
    const response = await apiClient.post('/institutions', institutionData);
    return response.data;
  },
  
  updateInstitution: async (id: string, institutionData: any) => {
    const response = await apiClient.put(`/institutions/${id}`, institutionData);
    return response.data;
  },
  
  deleteInstitution: async (id: string) => {
    const response = await apiClient.delete(`/institutions/${id}`);
    return response.data;
  },
};

// Students API
export const studentsApi = {
  getStudents: async (params?: any) => {
    const response = await apiClient.get('/students', { params });
    return response.data;
  },
  
  getStudent: async (id: string) => {
    const response = await apiClient.get(`/students/${id}`);
    return response.data;
  },
  
  createStudent: async (studentData: any) => {
    const response = await apiClient.post('/students', studentData);
    return response.data;
  },
  
  updateStudent: async (id: string, studentData: any) => {
    const response = await apiClient.put(`/students/${id}`, studentData);
    return response.data;
  },
  
  deleteStudent: async (id: string) => {
    const response = await apiClient.delete(`/students/${id}`);
    return response.data;
  },
};

// AI API
export const aiApi = {
  generateLessonPlan: async (lessonPlanData: any) => {
    const response = await apiClient.post('/ai/lesson-plan', lessonPlanData);
    return response.data;
  },
  
  generateQuiz: async (quizData: any) => {
    const response = await apiClient.post('/ai/quiz', quizData);
    return response.data;
  },
  
  analyzePerformance: async (performanceData: any) => {
    const response = await apiClient.post('/ai/analyze-performance', performanceData);
    return response.data;
  },
  
  generateFeedback: async (feedbackData: any) => {
    const response = await apiClient.post('/ai/feedback', feedbackData);
    return response.data;
  },
};

export default {
  auth: authApi,
  users: usersApi,
  institutions: institutionsApi,
  students: studentsApi,
  ai: aiApi,
};