import React, { useState, useEffect } from "react";
import { FaCircle, FaTrash, FaCalendar, FaPlus } from "react-icons/fa6";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  const [task, setTask] = useState(null);

  const handleGetTask = async (taskId: string) => {
    let data = await taskServices.getTaskById(taskId);
    setTask(data);
    console.log(data);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await friendService.getFriends(user._id);
        console.log(user._id);
        console.log(fetchedUsers);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
    handleGetTask(taskId);
  }, [user]);

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
      console.log("Task updated successfully");
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
      console.log("Friends added to team successfully");
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

  const handleRemoveTeamMember = async (data) => {
    await taskServices.removeTeamMember(data);
    handleGetTask(taskId);
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <ToastContainer />
      <div className="max-w-2xl mx-auto">
        <div className="text-3xl font-bold mb-4 text-blue-500">Mes tâches</div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="flex items-center font-bold text-red-500">
            <FaCircle className="mr-2" /> {task?.type}
          </h2>
          <button onClick={() => handleDeleteTask(task?._id)}>
            <FaTrash color="red" />
          </button>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h1 className="font-medium text-blue-500">{task?.title}</h1>
            <select
              className="shadow border-1"
              onChange={(e) => handleUpdateTaskStatus(task._id, e.target.value)}
            >
              <option value="done" className={getStatusColor("done")}>
                Terminé
              </option>
              <option value="coming" className={getStatusColor("coming")}>
                Prochainement
              </option>
              <option value="cancelled" className={getStatusColor("cancelled")}>
                Annulé
              </option>
              <option value="active" className={getStatusColor("active")}>
                En cours
              </option>
              <option value="late" className={getStatusColor("late")}>
                En retard
              </option>
            </select>
            <span className="text-green-500 font-medium">{task?.status}</span>
          </div>
          <div>
            <div className="flex justify-around">
              <div className="flex flex-row items-center text-gray-500 mb-4">
                <FaCalendar className="mr-2" />
                <span>{task?.date}</span>
              </div>
              <div className="shadow-xl border-2 flex flex-col items-center text-center">
                <h1 className="underline underline-offset-8 mb-3">Méteo</h1>
                <p>{task?.weather.temp} C°</p>
                <p>{task?.weather.description}</p>
                <p>
                  <img src={task?.weather.icon} alt="Weather icon" />
                </p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 font-medium text-gray-700"
              htmlFor="notes"
            >
              Ajouter Des Notes
            </label>
            <input
              type="text"
              id="notes"
              className="w-full px-3 py-2 border rounded"
              placeholder="Ajouter des notes..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <button
            disabled={note === ""}
            className={`px-6 py-2 ${
              note === "" ? "bg-blue-300" : "bg-green-600"
            } text-white rounded shadow-md`}
            onClick={() => handleAddNote(task._id)}
          >
            Ajouter
          </button>

          <div className="flex justify-around items-center mt-4">
            <button
              className="flex items-center text-blue-500"
              onClick={() => setShowModal(true)}
            >
              <FaPlus className="mr-2" /> Ajouter amis
            </button>
            <div>
              {task?.team.map((el) => (
                <div
                  key={el._id}
                  className="flex items-center justify-between mb-2"
                >
                  <span className="p-4 shadow">{el.name}</span>
                  <button
                    onClick={() =>
                      handleRemoveTeamMember({
                        todoId: task._id,
                        userId: el._id,
                      })
                    }
                  >
                    <FaTrash color="red" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded shadow-md"
            onClick={() => setShowNotesModal(true)}
          >
            Voir les notes
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-xl w-1/3">
              <h2 className="text-xl font-bold mb-4">
                Ajouter des amis à votre tâche
              </h2>
              <div className="mb-4">
                {users.map((user) => (
                  <div key={user._id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => toggleUserSelection(user._id)}
                    />
                    <span className="ml-2">{user.name}</span>
                  </div>
                ))}
              </div>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                onClick={handleAddFriendsToTeam}
              >
                Valider
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => setShowModal(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {showNotesModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-xl w-1/3">
              <h2 className="text-xl font-bold mb-4">Notes</h2>
              {task?.notes && task.notes.length > 0 ? (
                <ul>
                  {task.notes.map(
                    (note, index) =>
                      note != "" && (
                        <li key={index} className="mb-2">
                          - {note}
                        </li>
                      )
                  )}
                </ul>
              ) : (
                <ul>
                  <li>aucune note</li>
                </ul>
              )}
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow-md"
                onClick={() => setShowNotesModal(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManagement;
const getStatusColor = (status: string) => {
  switch (status) {
    case "coming":
      return "font-lg text-orange-600";
    case "active":
      return "font-lg text-blue-600";
    case "done":
      return "font-lg text-green-600";
    case "cancelled":
      return "font-lg text-red-600";
    default:
      return "font-lg text-gray-600";
  }
};
