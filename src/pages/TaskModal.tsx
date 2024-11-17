import React from 'react';
import {Task} from '../interfaces/TaskInterface';
import {FaTimes} from 'react-icons/fa';


interface TaskModalProps {
  tasks: Task[];
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ tasks, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-md mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Liste des taches</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          {tasks.map(task => (
            <li  className="flex justify-between items-center p-2 border rounded">
              <div>
                <h4 className="font-semibold">{task.title}</h4>
                <p className="text-sm text-gray-500">{task.time}</p>
              </div>
             <div className="flex items-center">
  {/* Main Task User */}
  <div className="flex items-center p-4 mx-2">
    <span className="mx-2">{task.user_id.name}</span>
    <img 
      className="h-8 w-8 rounded-full object-cover" 
      src={`http://localhost:8000${task.user_id.image}`} 
      alt={`${task.user_id.name}'s profile`}
    />
  </div>

  {/* Team Members */}
  {task.team.length > 0 && (
    <div className="flex space-x-4">
      {task.team.map((teamMember, index) => (
        <div key={index} className="flex items-center p-4">
          <span className="mx-2">{teamMember.name}</span>
          <img 
            className="h-8 w-8 rounded-full object-cover" 
            src={`http://localhost:8000${teamMember.image}`} 
            alt={`${teamMember.name}'s profile`}
          />
        </div>
      ))}
    </div>
  )}
</div>
              <div className={`w-3 h-3 rounded-full ${getTaskColor(task.type)}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const getTaskColor = (category: string) => {
  switch (category) {
    case 'Education': return 'bg-green-700';
    case 'Perso': return 'bg-yellow';
    case 'Santé et bien être': return 'bg-red-700';
    case 'Travail': return 'bg-blue-700';
    default: return 'bg-gray-700';
  }
};

export default TaskModal;
