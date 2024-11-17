import React, { useEffect, useState } from "react";
import { getWeatherForcast } from "../../services/WeatherServices";
export const WeatherForecast: React.FC = () => {
  const [weatherData, setWeatherData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getWeatherForcast(user.city).then((response) => {
      setWeatherData(response.data);
    });
  }, [user]);

  return (
    <div className="mt-4 bg-gradient-to-b from-blue-400 to-blue-600 p-6 rounded-2xl shadow-lg w-5/6 mx-auto">
      <div className="shadow shadow-lg flex items-center justify-center text-center current-weather">
        <h2 className="text-2xl font-semibold text-white capitalize ">
          {user?.city}
        </h2>
        <img
          className=" h-45"
          src={weatherData?.currentIcon}
          alt="Current Weather Icon"
        />
        <h2 className="text-2xl font-semibold text-white">
          {" "}
          {weatherData?.currentTemp}
        </h2>
      </div>
      <div className="mt-6 grid grid-cols-6 gap-4">
        {weatherData?.forecast.map((item, index) => (
          <div key={index} className="text-white text-center forecast-item">
            <p>{item.time}</p>
            <img src={item.icon} alt="Weather Icon" />
            <p>{item.temp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
