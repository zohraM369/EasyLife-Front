import axios from "axios";
import { Task } from "../interfaces/TaskInterface";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8000/tasks"; // Replace with your API URL

interface CreateTaskResponse {
  msg: string;
  data?: Task;
}

export const taskServices = {
  // Fetch all tasks
  getUserTasks: async (user_id: string): Promise<Task[]> => {
    console.log("am working ! ");
    const response = await axios.get<Task[]>(
      API_URL + `/get_user_tasks/${user_id}`
    );
    return response.data;
  },

  // Fetch a task by ID
  getTaskById: async (id: string): Promise<Task> => {
    const response = await axios.get<Task>(`${API_URL}/get_task_by_id/${id}`);
    return response.data;
  },

  // Create a new task
  createTask: async (task: Task): Promise<CreateTaskResponse> => {
    console.log(task);
    const response = await axios.post<CreateTaskResponse>(
      API_URL + "/add_task",
      task
    );
    return response.data;
  },

  // Update a task
  updateTask: async (id: string, task: Task): Promise<any> => {
    await axios.put<Task>(API_URL + "/update_task/" + id, task);
    return toast.info("Tâche mis a jour avec success ! ");
  },

  // Delete a task
  deleteTask: async (id: string): Promise<any> => {
    await axios.delete(API_URL + "/delete_task/" + id);
    return toast.error("Tâche supprimé");
  },

  addTeamMemberToTask: async (data: any): Promise<any> => {
    await axios.post(API_URL + "/add_team_member_to_task", data);
    return toast.error("Tâche supprimé");
  },

  removeTeamMember: async (data: any): Promise<any> => {
    await axios.put(API_URL + "/remove_team_member_from_task", data);
    return toast.error("Membre supprimé");
  },
};
