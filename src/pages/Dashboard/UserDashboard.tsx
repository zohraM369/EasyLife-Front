import React, { useEffect, useState } from "react";
import CardDataStats from "../../components/CardDataStats";

import { Calendar } from "../Calendar";
import { FaRegListAlt } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { MdDoneOutline } from "react-icons/md";
import TodayTasks from "../../pages/tasks/TodayTasks";
import { Task } from "../../interfaces/TaskInterface";
import { taskServices } from "../../services/TaskServices";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { friendService } from "../../services/friendsService";
interface TeamProps {
  friends: { id: string; name: string; image: string }[];
}

const TeamComponent: React.FC<TeamProps> = ({ friends }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-4 flex items-center justify-between p-4 bg-blue-100 rounded-full shadow-lg">
      <button
        onClick={() => navigate("/dashboard/friends_management")}
        className="bg-blue-500 text-white py-2 px-4 rounded-full"
      >
        Équipe
        <div className="flex space-x-2 ml-4">
          {" "}
          {friends?.map((friend) => (
            <img
              src={`http://localhost:8000${friend.image}`}
              className="w-8 h-8 rounded-full"
            />
          ))}
        </div>
      </button>
      <div className="flex items-center">
        <button
          className="flex items-center space-x-2 text-gray-600"
          onClick={() => navigate("/dashboard/friends_management")}
        >
          <span className="inline-flex justify-center items-center h-8 w-8 bg-gray-200 rounded-full">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
          </span>
          <span>Ajouter plus</span>
        </button>
        <div className="flex space-x-2 ml-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="w-8 h-8 bg-gray-300 rounded-full"></div>
          ))}
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
            {friends?.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export const UserDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [friends, setFriends] = useState<string[]>([]);
  const { user } = useAuth();
  const userId = user?._id;

  useEffect(() => {
    const fetchTasks = async () => {
      if (userId) {
        try {
          const response = await taskServices.getUserTasks(userId);
          console.log("Fetched tasks:", response);
          setTasks(response);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }
    };

    const fetchFriends = async () => {
      if (user) {
        try {
          const userFriends = await friendService.getFriends(user._id);
          setFriends(userFriends);
          console.log(userFriends);
        } catch (error) {
          console.error("Error fetching friends:", error);
        }
      }
    };

    fetchTasks();
    fetchFriends();
  }, [userId]);

  return (
    <div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          <CardDataStats
            title="Avenir"
            total={tasks.filter((el) => el.status === "coming").length}
            color="blue"
          >
            <FaRegListAlt size={"3vh"} color="blue" />
          </CardDataStats>
          <CardDataStats
            title="En retard"
            total={tasks.filter((el) => el.status === "late").length}
            color="red"
          >
            <FaStop color="red" size={"3vh"} />
          </CardDataStats>
          <CardDataStats
            title="Terminées"
            total={tasks.filter((el) => el.status === "done").length}
            color="green"
          >
            <MdDoneOutline color="green" size={"3vh"} />
          </CardDataStats>
        </div>

        <div>
          <TeamComponent friends={friends} />
        </div>

        <div className="flex w-full">
          <Calendar tasks={tasks} />
          <TodayTasks tasks={tasks} />
        </div>
      </div>
    </div>
  );
};
