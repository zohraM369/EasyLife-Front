import { useState, useEffect } from "react";
import taskServices from "../../services/TaskServices";
import Task from "../../interfaces/TaskInterface";
import { getWeatherForTask } from "../../services/WeatherServices";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export const AddTask = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [task, setTask] = useState<Task>({
    user_id: user._id,
    title: "",
    description: "",
    date: "",
    time: "",
    type: "Perso",
    outside: false,
    notes: [""],
    status: "coming",
    weather: {
      description: "",
      temp: 0,
      icon: "",
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Function to format time
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}h${minutes}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user.city) {
      try {
        const weather = await getWeatherForTask(task, user.city);
        console.log(weather);
        if (weather) {
          const updatedTask = { ...task, weather: weather };

          const response = await taskServices.createTask(updatedTask);

          toast.success(response.msg);

          setTimeout(() => {
            navigate("/dashboard/tasks");
          }, 2500);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    } else {
      console.log("City not found in local storage.");
    }
  };

  const handleDateChange = (e) => {
    const rawDate = e.target.value; // Format: "yyyy-mm-dd"
    const [year, month, day] = rawDate.split("-");
    const formattedDate = `${day}/${month}/${year}`;
    setTask({ ...task, date: formattedDate });
  };

  const handleTimeChange = (e) => {
    const rawTime = e.target.value; // Format: "hh:mm"
    const [hours, minutes] = rawTime.split(":");
    const formattedTime = `${hours}h${minutes}`;
    setTask({ ...task, time: formattedTime });
  };
  return (
    <div className=" min-h-screen flex">
      <ToastContainer />
      <main className=" flex-1 p-8 bg-gray-50 ">
        <section className="bg-white p-8 dark:bg-boxdark-2 dark:text-bodydark rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Ajouter une tâche</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 ">
              <label className="block text-sm font-medium mb-2">
                Nom de la tâche
              </label>
              <input
                type="text"
                name="title"
                placeholder="Votre tâche"
                className="w-full p-3 border border-gray-300 rounded-md"
                value={task.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <input
                type="text"
                name="description"
                placeholder="Votre description"
                className="w-full p-3 border border-gray-300 rounded-md"
                value={task.description}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  onChange={handleDateChange}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Heure</label>
                <input
                  type="time"
                  name="time"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  onChange={handleTimeChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="Perso"
                    className="form-radio"
                    checked={task.type === "Perso"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Perso</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="Education"
                    className="form-radio"
                    checked={task.type === "Education"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Education</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="Santé et bien être"
                    className="form-radio"
                    checked={task.type === "Santé et bien être"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Santé et bien être</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="Travail"
                    className="form-radio"
                    checked={task.type === "Travail"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Travail</span>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium mb-2">
                Localisation
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="outside"
                    className="form-checkbox"
                    checked={task.outside}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Activité extérieure</span>
                </label>
              </div>
            </div>
            <div className="flex items-center space-x-10 justify-center">
              <button
                type="submit"
                className="bg-customGreen hover:bg-customGreen text-white font-bold py-3 px-11  rounded-2xl"
              >
                Ajouter
              </button>
              <button
                type="button"
                className="bg-customRouge hover:bg-customRouge text-white font-bold py-3 px-11  rounded-2xl"
                onClick={() =>
                  setTask({
                    ...task,
                    outside: false,
                    title: "",
                    description: "",
                    date: "",
                    time: "",
                    type: "Perso",
                    weather: {
                      description: "",
                      temp: 0,
                      icon: "",
                    },
                  })
                }
              >
                Annuler
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};
