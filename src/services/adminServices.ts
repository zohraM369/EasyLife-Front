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


const API_BASE_URL = 'http://localhost:8000/admin'; 

const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get_all_users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const getTotalTasksByStatus = async (): Promise<TaskSummary> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get_all_tasks_by_status`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task summary:', error);
    throw error;
  }
};

interface TaskTypesSummary {
  [type: string]: number;
}

// Fetch task summary by type
const getTaskSummaryByType = async (): Promise<TaskTypesSummary> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get_all_tasks_by_types`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task summary by type:', error);
    throw error;
  }
};

const getMonthlyUserStats = async (): Promise<TaskTypesSummary> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get_monthly_user_stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task summary by type:', error);
    throw error;
  }
};




export default {
  getUsers,
  getTotalTasksByStatus,
  getTaskSummaryByType,
  getMonthlyUserStats
};
