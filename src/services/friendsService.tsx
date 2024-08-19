import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:8000/friends";

export const friendService = {
  sendFriendRequest: async (userId: string, email: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/send_friend_request`, {
        userId,
        email,
      });
      toast.success("Demande amitié envoyée");
      return response.data;
    } catch (error) {
      console.error("Error sending friend request", error);
      toast.error("Email non trouvé");
      throw error;
    }
  },

  getFriendRequests: async (userId: string) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/get_friends_requests/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching friend requests", error);
      throw error;
    }
  },

  getFriends: async (userId: string) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/get_friends_list/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching friends", error);
      throw error;
    }
  },

  acceptFriendRequest: async (requestId: string) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/handle_friend_request/accept`,
        { requestId }
      );
      toast.success("Demande amitié accepté");
      return response.data;
    } catch (error) {
      console.error("Error accepting friend request", error);
      throw error;
    }
  },

  deleteFriend: async (data: any) => {
    console.log(data);
    try {
      const response = await axios.post(`${API_BASE_URL}/delete_friend`, data);
      toast.warn("Amitié supprimé");
      return response.data;
    } catch (error) {
      console.error("Error deleting friend", error);
      throw error;
    }
  },
};
