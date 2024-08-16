import axios from 'axios';
import Task from '../interfaces/TaskInterface';
import WeatherResponse from '../interfaces/WeatherInterface';

const OPENWEATHERMAP_API_KEY = '7e6bb1426b6090c0571b94c216476c14'; 


export const getWeatherForTask = async (task: Task, city: string): Promise<WeatherResponse | null> => {
  try {
    
    const dateTime = new Date(`${task.date}T${task.time}`);
    const timestamp = Math.floor(dateTime.getTime() / 1000);
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHERMAP_API_KEY}&dt=${timestamp}`);
    console.log(response)

    return {
      temp: Math.round((Number(response.data.main.temp)-273.15)), //kelvin  - 273.15
      description: response.data.weather[0].description,
      icon:  `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` 
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};