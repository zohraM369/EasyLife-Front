import axios from "axios";
import { Task } from "../pages/tasks/todoitems";

const http = axios.create({
  baseURL: "http://localhost:8000",
});

interface ApiResponse {
  error?: string;
  msg?: string;
}

export const ajout_todo_item = {
  ajout_todoItem: async (Data: Task): Promise<ApiResponse> => {
    try {
      const response = await http.post<ApiResponse>(`/add_todo_item`, Data);
      return response.data;
    } catch (error) {
      return { error: "erreur" };
    }
  },
};
