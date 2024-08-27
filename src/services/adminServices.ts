import axios from 'axios';

// Define the User and Task interfaces
interface User {
  _id: string;
  name: string;
  image: string;
  friends: string[];
  email: string;
  phone: string;
  role: string;
}

interface TaskSummary {
  [status: string]: number;
}

interface TaskTypesSummary {
  [type: string]: number;
}

// Create an Axios instance
const API_BASE_URL = 'http://localhost:8000/admin';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the token in the headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API functions
const getUsers = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get('/get_all_users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const getTotalTasksByStatus = async (): Promise<TaskSummary> => {
  try {
    const response = await apiClient.get('/get_all_tasks_by_status');
    return response.data;
  } catch (error) {
    console.error('Error fetching task summary:', error);
    throw error;
  }
};

// Fetch task summary by type
const getTaskSummaryByType = async (): Promise<TaskTypesSummary> => {
  try {
    const response = await apiClient.get('/get_all_tasks_by_types');
    return response.data;
  } catch (error) {
    console.error('Error fetching task summary by type:', error);
    throw error;
  }
};

const getMonthlyUserStats = async (): Promise<TaskTypesSummary> => {
  try {
    const response = await apiClient.get('/get_monthly_user_stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching task summary by type:', error);
    throw error;
  }
};

// Export the API functions
export default {
  getUsers,
  getTotalTasksByStatus,
  getTaskSummaryByType,
  getMonthlyUserStats,
};
