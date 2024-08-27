import axios from "axios";
import { Message } from "../interfaces/MessageInterface";

const API_URL = 'http://localhost:8000/messages';

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

const createMessage = async (message: Message): Promise<Message> => {
  const response = await apiClient.post('/create_message', message);
  return response.data;
};

const getMessagesByUserId = async (userId: string): Promise<Message[]> => {
  const response = await apiClient.get(`/get_user_messages/${userId}`);
  return response.data;
};

const getPeopleChat = async (userId: string, x: string): Promise<Message[]> => {
  const response = await apiClient.get(`/get_people_chat/${userId}/${x}`);
  return response.data;
};

const getPeopleTalkedWith = async (userId: string): Promise<Message[]> => {
  const response = await apiClient.get(`/get_people_talked_with/${userId}`);
  return response.data;
};

const deleteMessage = async (messageId: string): Promise<void> => {
  await apiClient.delete(`/delete_message/${messageId}`);
};

export default {
  createMessage,
  getMessagesByUserId,
  deleteMessage,
  getPeopleTalkedWith,
  getPeopleChat,
};
