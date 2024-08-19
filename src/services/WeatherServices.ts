import axios from "axios";
import { Task } from "../interfaces/TaskInterface";

const API_URL = "http://localhost:8000/weather";

export const getWeatherForTask = async (
  task: Task,
  city: string
): Promise<any | null> => {
  let result = axios.post(API_URL + `/weather`, { task: task, city: city });
  console.log(result);
  return result;
};
