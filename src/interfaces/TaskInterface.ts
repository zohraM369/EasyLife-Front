import WeatherResponse from "./WeatherInterface";

interface Task {
  _id?:any;
  user_id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: string;
  outside: boolean;
  status: string;
  weather: WeatherResponse
  notes:[string]
}

export default Task