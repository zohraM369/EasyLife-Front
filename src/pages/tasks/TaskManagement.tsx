import React, { useState, useEffect } from "react";
import {
  FaCircle,
  FaTrash,
  FaCalendar,
  FaPlus,
  FaRecycle,
} from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import taskServices from "../../services/TaskServices";
import friendService from "../../services/friendsService";
import { useAuth } from "../../context/AuthContext";

const TaskManagement: React.FC = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { user } = useAuth();
  const [note, setNote] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await friendService.getFriends(user._id);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
    handleGetTask(taskId);
  }, [user]);

  const handleGetTask = async (taskId: string) => {
    let data = await taskServices.getTaskById(taskId);
    setTask(data);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await taskServices.deleteTask(taskId);
      setTimeout(() => {
        navigate("/dashboard/tasks");
      }, 1200);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, status: string) => {
    let newTask = { ...task, status: status };
    console.log(newTask)
    try {
      await taskServices.updateTask(taskId, newTask);
      handleGetTask(taskId);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleAddNote = async (taskId: string) => {
    const updatedTask = {
      ...task,
      notes: [...task.notes, note],
    };

    try {
      await taskServices.updateTask(taskId, updatedTask);
      handleGetTask(taskId);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleAddFriendsToTeam = async () => {
    const updatedTask = {
      ...task,
      team: [...task.team, ...selectedUsers],
    };

    try {
      await taskServices.updateTask(task._id, updatedTask);
      setShowModal(false);
      handleGetTask(taskId);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const handleRemoveTeamMember = async (data: {
    todoId: string;
    userId: string;
  }) => {
    await taskServices.removeTeamMember(data);
    handleGetTask(taskId);
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="text-center capitalize text-3xl font-bold mb-4 text-blue-600">
          {task?.title}
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="flex items-center font-bold text-red-600">
            <FaCircle className="mr-2" /> {task?.type}
          </h2>
          <button
            onClick={() => handleDeleteTask(task?._id)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash size={18} />
          </button>
          <div className="flex items-center">
            <button
              onClick={() => navigate(`/dashboard/update_task/${task?._id}`)}
              className="flex items-center text-green-500 hover:text-green-700"
            >
              <FaRecycle className="mx-2" /> Mettre à jour
            </button>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
          <div className="flex justify-between items-center mb-2">
            <h1 className="font-medium text-xl text-blue-600">{task?.title}</h1>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`status-${task?._id}`}
                  value="done"
                  checked={task?.status == "done"}
                  className="mr-2"
                  onChange={(e) =>
                    handleUpdateTaskStatus(task._id, e.target.value)
                  }
                />
                <span className={getStatusColor("done")}>Terminé</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name={`status-${task?._id}`}
                  value="coming"
                  checked={task?.status == "coming"}
                  className="mr-2"
                  onChange={(e) =>
                    handleUpdateTaskStatus(task._id, e.target.value)
                  }
                />
                <span className={getStatusColor("coming")}>A venir</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name={`status-${task?._id}`}
                  value="cancelled"
                  checked={task?.status == "cancelled"}
                  className="mr-2"
                  onChange={(e) =>
                    handleUpdateTaskStatus(task._id, e.target.value)
                  }
                />
                <span className={getStatusColor("cancelled")}>Annulé</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name={`status-${task?._id}`}
                  value="active"
                  checked={task?.status == "active"}
                  className="mr-2"
                  onChange={(e) =>
                    handleUpdateTaskStatus(task._id, e.target.value)
                  }
                />
                <span className={getStatusColor("active")}>En cours</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name={`status-${task?._id}`}
                  value="late"
                  checked={task?.status == "late"}
                  className="mr-2"
                  onChange={(e) =>
                    handleUpdateTaskStatus(task._id, e.target.value)
                  }
                />
                <span className={getStatusColor("late")}>En retard</span>
              </label>
            </div>
          </div>

          <div className="flex justify-around mt-4">
            <div className="flex items-center text-gray-500">
              <FaCalendar className="mr-2" />
              <span>{task?.date}</span>
            </div>
            {task?.outside ? (
                <div className="mt-4 bg-gradient-to-b from-blue-400 to-blue-600 p-6 rounded-2xl shadow-lg w-1/2 mx-auto">
     <div className="shadow shadow-lg flex items-center justify-center text-center current-weather">
       
              <div className=" text-white flex flex-col items-center text-center p-4 rounded-lg shadow-sm">
                <h1 className="underline underline-offset-8 mb-2 text-lg">
                  Météo
                </h1>
                <div className="flex">
                  {" "}
                  <p className="mx-3">{task?.weather.temp} C°</p>
                  <p>{task?.weather.description}</p>
                </div>

                <img
                  src={task?.weather.icon}
                  alt="Weather icon"
                  className="w-25 h-25 mt-2"
                />
              </div>
              </div>
              </div>
            ) : null}
          </div>

          <div className="mt-6">
            <label
              className="block mb-2 font-medium text-gray-700"
              htmlFor="notes"
            >
              Ajouter Des Notes
            </label>
            <input
              type="text"
              id="notes"
              className="w-full px-4 py-2 border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ajouter des notes..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <button
            disabled={note === ""}
            className={`mt-4 px-6 py-2 text-white rounded-lg shadow-md ${
              note === "" ? "bg-blue-300" : "bg-green-600 hover:bg-green-700"
            }`}
            onClick={() => handleAddNote(task._id)}
          >
            Ajouter
          </button>

          <div className="flex justify-between items-center mt-6">
            <button
              className="flex items-center text-blue-500 hover:text-blue-700"
              onClick={() => setShowModal(true)}
            >
              <FaPlus className="mr-2" /> Ajouter amis
            </button>
            <div className="mt-4">
              {task?.team.map((el: any) => (
                <div
                  key={el._id}
                  className="flex items-center justify-between mb-2 bg-white p-2 rounded-lg shadow-sm"
                >
                  <span className="p-2 shadow-sm text-gray-700">{el.name}</span>
                  <button
                    onClick={() =>
                      handleRemoveTeamMember({
                        todoId: task._id,
                        userId: el._id,
                      })
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700"
            onClick={() => setShowNotesModal(true)}
          >
            Voir les notes
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96">
              <h2 className="text-xl font-bold mb-4">
                Ajouter amis à l'équipe
              </h2>
              <div className="max-h-64 overflow-y-auto">
                {users.map((user: any) => (
                  <div key={user._id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => toggleUserSelection(user._id)}
                      className="mr-2"
                    />
                    <span>{user.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                  onClick={() => setShowModal(false)}
                >
                  Annuler
                </button>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
                  onClick={handleAddFriendsToTeam}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        )}

        {showNotesModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96">
              <h2 className="text-xl font-bold mb-4">Notes</h2>
              <div className="max-h-64 overflow-y-auto">
                {task?.notes?.map((note: any, index: number) => (
                  <p
                    key={index}
                    className="mb-2 p-2 rounded-lg shadow-sm bg-gray-100"
                  >
                    {note}
                  </p>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                  onClick={() => setShowNotesModal(false)}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function getStatusColor(status: string) {
  switch (status) {
    case "done":
      return "text-green-600";
    case "coming":
      return "text-blue-600";
    case "cancelled":
      return "text-red-600";
    case "active":
      return "text-yellow";
    case "late":
      return "text-orange-600";
    default:
      return "";
  }
}

export default TaskManagement;
