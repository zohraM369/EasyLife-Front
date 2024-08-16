import React, { useState } from 'react';
import Task from '../interfaces/TaskInterface';
import { FaCircle } from 'react-icons/fa6';
import TaskModal from './TaskModal'; // Import the TaskModal component

interface CalendarProps {
  tasks: Task[];
}

const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar: React.FC<CalendarProps> = ({ tasks }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const startOfMonth = new Date(currentYear, currentMonth, 1);
  const startDay = startOfMonth.getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

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

  const convertDate = (dateString: string) => {
    const [day, month, year]: string[] = dateString.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const handleDayClick = (tasksForDay: Task[]) => {
    setSelectedTasks(tasksForDay);
    setIsModalOpen(true);
  };

  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - startDay + 1;
    const date = new Date(currentYear, currentMonth, day);
    const dateString = date.toISOString().split('T')[0];
    const eventsForDay = tasks.filter(e => convertDate(e.date).toISOString().split('T')[0] === dateString);

    return (
      <div key={i} className="h-15 border p-1 relative">
        <div className="absolute top-0 left-0 p-1">
          {day > 0 && day <= daysInMonth ? day : ''}
        </div>
        {eventsForDay.length > 0 ? (
          <div
            className='flex-column items-center justify-center cursor-pointer'
            onClick={() => handleDayClick(eventsForDay)}
          >
            <div className={`w-full h-4 ${getTaskColor(eventsForDay[0].type)} flex py-5 items-center justify-center rounded text-white text-xs`}>
              <h4 className='text-center font-medium'>
                {eventsForDay.length > 1 ? `${eventsForDay.length} taches` : eventsForDay[0].title}
                <br /><span>{eventsForDay[0].time}</span>
              </h4>
            </div>
            <div className='flex items-center justify-center'>
              <FaCircle size={'1.5vh'} color={getStatusColor(eventsForDay[0].status)} />
              <img className='h-3 rounded' src={`http://localhost:8000${eventsForDay[0].user_id.image}`}  />
             {
           eventsForDay.map((event, eventIndex) => 
               event.team.map((teamMember, teamIndex) => {
               return (
        <img 
          key={`${eventIndex}-${teamIndex}`} 
          className="h-3 rounded" 
          src={`http://localhost:8000${teamMember.image}`} 
        />
      );
    })
  )
}
            </div>
          </div>
        ) : (
          <div className={`w-full h-4 flex items-center justify-center p-5 rounded text-white text-xs`}>
            <h4 className='font-medium'></h4>
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="w-full p-4">
      <div className="flex justify-end items-center mb-4 space-x-2">
        <div className="rounded bg-blue-500 text-white px-4 py-2">
          <button onClick={handlePreviousMonth} className="bg-blue-500 text-white px-4 py-2 rounded-l-lg">
            &lt;
          </button>
          {startOfMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          <button onClick={handleNextMonth} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
            &gt;
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {daysInWeek.map(day => (
          <div key={day} className="font-bold">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {calendarDays}
      </div>

      {isModalOpen && <TaskModal tasks={selectedTasks} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Calendar;

const getTaskColor = (category: string) => {
  switch (category) {
    case 'Education': return 'bg-green-700';
    case 'Perso': return 'bg-yellow-700';
    case 'Santé et bien être': return 'bg-red-700';
    case 'Travail': return 'bg-blue-700';
    default: return 'bg-gray-700';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'coming': return 'orange';
    case 'active': return 'blue';
    case 'done': return 'green';
    case 'cancelled': return 'red';
    default: return 'gray';
  }
};
