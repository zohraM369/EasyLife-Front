import { useState, useEffect } from "react";
import taskServices from "../../services/TaskServices";
import { Task } from "../../interfaces/TaskInterface";
import { getWeatherForTask } from "../../services/WeatherServices";
import { toast } from "react-toastify";
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

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors: any = {};
    if (!task.title) newErrors.title = "Le nom de la tâche est requis";
    if (!task.description) newErrors.description = "La description est requise";
    if (!task.date) newErrors.date = "La date est requise";
    if (!task.time) newErrors.time = "L'heure est requise";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (task.outside && user?.city) {
        const weather = await getWeatherForTask(task, user.city);
        if (weather.data) {
          const updatedTask = { ...task, weather: weather.data.data };
          const response = await taskServices.createTask(updatedTask);
          toast.success(response.msg);
          setTimeout(() => {
            navigate("/dashboard/tasks");
          }, 2500);
        }
      } else {
        const response = await taskServices.createTask(task);
        toast.success(response.msg);
        setTimeout(() => {
          navigate("/dashboard/tasks");
        }, 2500);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleDateChange = (e: any) => {
    const rawDate = e.target.value;
    const [year, month, day] = rawDate.split("-");
    const formattedDate = `${day}/${month}/${year}`;
    setTask({ ...task, date: formattedDate });
    setErrors({ ...errors, date: "" });
  };

  const handleTimeChange = (e: any) => {
    const rawTime = e.target.value; // Format: "hh:mm"
    const [hours, minutes] = rawTime.split(":");
    const formattedTime = `${hours}h${minutes}`;
    setTask({ ...task, time: formattedTime });
    setErrors({ ...errors, time: "" });
  };

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 p-8 bg-gray-50">
        <section className="bg-white p-8 dark:bg-boxdark-2 dark:text-bodydark rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Ajouter une tâche</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
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
              {errors.title && (
                <span className="text-red-500 text-sm">{errors.title}</span>
              )}
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
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description}
                </span>
              )}
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="flex-1">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      className="w-full p-3 border border-gray-300 rounded-md"
                      type="date"
                      onChange={handleDateChange}
                    />
                  </div>
                  {errors.date && (
                    <span className="text-red-500 text-sm">{errors.date}</span>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Heure</label>
                <input
                  type="time"
                  name="time"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  onChange={handleTimeChange}
                />
                {errors.time && (
                  <span className="text-red-500 text-sm">{errors.time}</span>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Type</label>
              <div className="flex flex-col space-y-2 ml-4">
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
            <div className="flex space-x-4 items-center justify-center w-full">
              <button
                type="submit"
                className="bg-customGreen hover:bg-green-600 text-white font-bold py-3 px-10 rounded-3xl"
              >
                Ajouter
              </button>
              <button
                type="button"
                className="bg-customRouge hover:bg-red-600 text-white font-bold py-3 px-10 rounded-3xl"
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
