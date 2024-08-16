import axios from "axios";
import { Message } from "../interfaces/MessageInterface";

const API_URL = 'http://localhost:8000/messages';

const createMessage = async (message: Message): Promise<Message> => {
  const response = await axios.post(`${API_URL}/create_message`, message);
  return response.data;
};

const getMessagesByUserId = async (userId: string): Promise<Message[]> => {
  const response = await axios.get(`${API_URL}/get_user_messages/${userId}`);
  return response.data;
};


const getPeopleChat = async (userId: string,x:string): Promise<Message[]> => {
  const response = await axios.get(`${API_URL}/get_people_chat/${userId}/${x}`);
  return response.data;
};



const getPeopleTalkedWith = async (userId: string): Promise<Message[]> => {
  const response = await axios.get(`${API_URL}/get_people_talked_with/${userId}`);
  return response.data;
};


const deleteMessage = async (messageId: string): Promise<void> => {
  await axios.delete(`${API_URL}/delete_message/${messageId}`);
};

export default {
  createMessage,
  getMessagesByUserId,
  deleteMessage,
  getPeopleTalkedWith,
  getPeopleChat
};
