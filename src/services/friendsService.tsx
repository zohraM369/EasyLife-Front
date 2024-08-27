import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:8000/friends';

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

const friendService = {
  sendFriendRequest: async (userId: string, email: string) => {
    try {
      const response = await apiClient.post('/send_friend_request', { userId, email });
      toast.success("Demande amitié envoyée");
      return response.data;
    } catch (error) {
      console.error('Error sending friend request', error);
      toast.error('Email non trouvé');
      throw error;
    }
  },

  getFriendRequests: async (userId: string) => {
    try {
      const response = await apiClient.get(`/get_friends_requests/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching friend requests', error);
      throw error;
    }
  },

  getFriends: async (userId: string) => {
    try {
      const response = await apiClient.get(`/get_friends_list/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching friends', error);
      throw error;
    }
  },

  acceptFriendRequest: async (requestId: string) => {
    try {
      const response = await apiClient.post('/handle_friend_request/accept', { requestId });
      toast.success("Demande amitié accepté");
      return response.data;
    } catch (error) {
      console.error('Error accepting friend request', error);
      throw error;
    }
  },

  deleteFriend: async (data: any) => {
    console.log(data);
    try {
      const response = await apiClient.post('/delete_friend', data);
      toast.warn("Amitié supprimé");
      return response.data;
    } catch (error) {
      console.error('Error deleting friend', error);
      throw error;
    }
  },
};

export default friendService;
