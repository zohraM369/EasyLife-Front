import React, { useEffect, useState } from 'react';
import { FaCircle, FaTrash } from 'react-icons/fa';
import taskServices from '../../services/TaskServices';
import Task from '../../interfaces/TaskInterface';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserTasks: React.FC = () => {
  const {user} = useAuth()
  console.log(user)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [fetchTrigger, setFetchTrigger] = useState<boolean>(false);
  const user_id = user?._id

  const fetchTasks = async () => {  
    try {
      const response = await taskServices.getUserTasks(user_id);
      console.log('Fetched tasks:', response);
      setTasks(response);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTrigger]);

  const handleDeleteTask = async (taskId: string) => {
    try {
      await taskServices.deleteTask(taskId);
      setFetchTrigger(!fetchTrigger); 
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const groupedTasks = tasks.reduce((acc: { [key: string]: Task[] }, task) => {
    if (!acc[task.type]) {
      acc[task.type] = [];
    }
    acc[task.type].push(task);
    return acc;
  }, {});

  const navigate = useNavigate();

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark p-4 bg-blue-50 min-h-screen">
      
      <div className="container mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Mes tâches</h1>
        <div className="flex justify-between items-center mb-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Aujourd'hui
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(groupedTasks).map(type => (
            <div key={type} className=" border border-gray-200 rounded-lg mb-2 shadow-lg p-4">
              <h2 className={`text-xl font-bold ${getTaskColor(type)} flex items-center`}>
                <FaCircle className="mr-2" /> {type}
              </h2>
              {groupedTasks[type].map(task => (
                <div
                  key={task._id}
                  className="mt-4 p-4 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition duration-300"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-blue-600">{task.title}</h3>
                    <h4 onClick={() => navigate(`/dashboard/task_management/${task._id}`)}>Voir les détails</h4>
                    <button onClick={() => handleDeleteTask(task._id)} className="text-red-600 hover:text-red-700 transition duration-300">
                      <FaTrash />
                    </button>
                  </div>
                  <span className={`block mt-2 p-1 border rounded-md ${getStatusColor(task.status)} text-sm font-medium`}>{task.status}</span>
                  <div className="mt-4">
                    <p className="text-gray-700">- Description: {task.description}</p>
                    <p className="text-gray-700">- Date: {task.date}</p>
                    <p className="text-gray-700">- Heure: {task.time}</p>
                    <p className="text-gray-700 mt-2">- Les notes:</p>
                    <ol className="list-disc list-inside text-green-600 mt-1">
                      {task.notes.map((note, index) => (
                        note.length >0 && <li key={index}>{note}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const getTaskColor = (category: string) => {
  switch (category) {
    case 'Education': return 'text-green-600';
    case 'Perso': return 'text-yellow';
    case 'Santé et bien être': return 'text-red-600';
    case 'Travail': return 'text-blue-600';
    default: return 'text-gray-600';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'coming': return 'border-orange-500 text-orange-500';
    case 'active': return 'border-blue-500 text-blue-500';
    case 'done': return 'border-green-500 text-green-500';
    case 'cancelled': return 'border-red-500 text-red-500';
    default: return 'border-gray-500 text-gray-500';
  }
};

export default UserTasks;
