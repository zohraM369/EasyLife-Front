import axios from 'axios';
import Task from '../interfaces/TaskInterface';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:8000/tasks';

const apiClient = axios.create({
  baseURL: API_URL,
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

interface CreateTaskResponse {
  msg: string;
  data?: Task;
}

const taskServices = {
  // Fetch all tasks
  getUserTasks: async (user_id: string): Promise<Task[]> => {
    console.log("am working!");
    const response = await apiClient.get<Task[]>(`/get_user_tasks/${user_id}`);
    return response.data;
  },

  getTaskById: async (id: string): Promise<Task> => {
    const response = await apiClient.get<Task>(`/get_task_by_id/${id}`);
    return response.data;
  },

  // Create a new task
  createTask: async (task: Task): Promise<CreateTaskResponse> => {
    console.log(task);
    const response = await apiClient.post<CreateTaskResponse>('/add_task', task);
    return response.data;
  },

  updateTask: async (id: string, task: Task): Promise<any> => {
  await apiClient.put<Task>(`/update_task/${id}`, task);

  // Show the notification only if the task's status is not "late"
  if (task.status !== "late") {
    return toast.info("Tâche mise à jour avec succès !");
  }
},

  deleteTask: async (id: string): Promise<any> => {
    await apiClient.delete(`/delete_task/${id}`);
    return toast.error("Tâche supprimée");
  },

  addTeamMemberToTask: async (data: any): Promise<any> => {
    await apiClient.post('/add_team_member_to_task', data);
    return toast.success("Membre ajouté à la tâche !");
  },

  removeTeamMember: async (data: any): Promise<any> => {
    await apiClient.put('/remove_team_member_from_task', data);
    return toast.error("Membre supprimé");
  },
};

export default taskServices;
