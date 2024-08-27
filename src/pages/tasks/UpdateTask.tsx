import { useState, useEffect } from "react";
import taskServices from "../../services/TaskServices";
import Task from "../../interfaces/TaskInterface";
import { getWeatherForTask } from "../../services/WeatherServices";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const UpdateTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams(); 
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

  

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await taskServices.getTaskById(taskId);
        const taskData = response;
        setTask(taskData);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.city) {
      try {
        const weather = await getWeatherForTask(task, user.city);
        if (weather.data) {
          const updatedTask = { ...task, weather: weather.data.data };

          const response = await taskServices.updateTask(taskId, updatedTask);
            console.log(response)
          toast.success(response.msg);

          setTimeout(() => {
            navigate('/dashboard/tasks');
          }, 2500);
        }
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      console.log("City not found in local storage.");
    }
  };

  const handleDateChange = (e: any) => {
    const rawDate = e.target.value;
    const [year, month, day] = rawDate.split("-");
    const formattedDate = `${day}/${month}/${year}`;
    setTask({ ...task, date: formattedDate });
  };

  const handleTimeChange = (e: any) => {
    const rawTime = e.target.value;
    const [hours, minutes] = rawTime.split(":");
    const formattedTime = `${hours}h${minutes}`;
    setTask({ ...task, time: formattedTime });
  };

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 p-8 bg-gray-50">
        <section className="bg-white p-8 dark:bg-boxdark-2 dark:text-bodydark rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Mettre à jour la tâche</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Nom de la tâche</label>
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
              <label className="block text-sm font-medium mb-2">Description</label>
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
                  value={task.date.split('/').reverse().join('-')} // reverse formatting for input
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Heure</label>
                <input
                  type="time"
                  name="time"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  onChange={handleTimeChange}
                  value={task.time.replace('h', ':')} // replace formatting for input
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
              <label className="block text-md font-medium mb-2">Localisation</label>
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
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md"
              >
                Mettre à jour
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-md"
                onClick={() => navigate('/dashboard/tasks')}
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
