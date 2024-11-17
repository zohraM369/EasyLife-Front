import React, { useEffect, useState } from 'react';
import { FaCalendar, FaCircle } from 'react-icons/fa6';
import Task from '../../interfaces/TaskInterface';
import taskServices from '../../services/TaskServices';
import { useAuth } from '../../context/AuthContext'; 
interface TaskCardProps {
  status: string;
  title: string;
  description: string;
  date: string;
  category: string;
  color: string;
}

const colors: { [key: string]: string } = {
  "Santé et bien être": "red",
  "Éducation": "green",
  "Perso": "yellow",
  "Travail": "blue",
};

const TaskCard: React.FC<TaskCardProps> = ({ description, status, title, date, category, color }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 border-l-4" style={{ borderColor: color }}>
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${status === 'En retard' ? 'text-red-500' : status === 'Terminé' ? 'text-green-500' : 'text-blue-500'}`}>
          {title}
        </h3>
        <button className="text-red-500">
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
      <p className="mt-2">{description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="flex text-sm text-gray-500 items-center">
          <FaCalendar className="mr-1" /> {date}
        </span>
        <span className="flex text-sm text-gray-500 items-center">
          <FaCircle className="mx-1" color={colors[category]} /> {category}
        </span>
      </div>
    </div>
  );
};

const ComingTasks: React.FC = () => {
  const today = new Date();
  const {user} = useAuth()
  const user_id = user._id ;

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await taskServices.getUserTasks(user_id);
        console.log('Fetched tasks:', response);
        setTasks(response);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const startOfMonth = new Date(currentYear, currentMonth, 1);

  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const getFilteredTasks = () => {
    return tasks
      .filter(task => {
        const taskDate = parseDate(task.date);
        return taskDate.getFullYear() === currentYear && taskDate.getMonth() === currentMonth;
      })
      .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime())
      .slice(0, 3);
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark p-6 bg-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-2xl font-bold mb-4">Prochainement</div>
        <div className="flex justify-between items-center mb-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Aujourd'hui</button>
          <div className="rounded bg-blue-500 text-white px-4 py-2">
            <button
              onClick={handlePreviousMonth}
              className="bg-blue-500 text-white px-4 py-2 rounded-l-lg"
            >
              &lt;
            </button>
            {startOfMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
            <button
              onClick={handleNextMonth}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <div key={index}>
                <h1 className='text-center mb-3'>{task.date}</h1>
                <TaskCard
                  description={task.description}
                  status={task.status}
                  title={task.title}
                  date={task.date}
                  category={task.type}
                  color={getTaskColor(task.type)}
                />
              </div>
            ))
          ) : (
            <div className="text-center col-span-full">aucun événement dans ce mois</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComingTasks;

const getTaskColor = (category: string) => {
  switch (category) {
    case 'Éducation': return 'bg-green-700';
    case 'Perso': return 'bg-yellow';
    case 'Santé et bien être': return 'bg-red-700';
    case 'Travail': return 'bg-blue-700';
    default: return 'bg-gray-700';
  }
};
