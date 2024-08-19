import React, { useEffect, useState } from "react";
import { FaEnvelope, FaTrash, FaStar } from "react-icons/fa";
import adminServices from "../../services/adminServices";
import { MessageModal } from "../Messages/MessageModal";
import { Message } from "../../interfaces/MessageInterface";
import messagesServices from "../../services/messagesServices";
import { authService } from "../../services/authServices";
import { toast } from "react-toastify";

interface User {
  _id: string;
  name: string;
  image: string;
  friends: string[];
  email: string;
  phone: string;
  role: string;
}

const itemsPerPage = 3;

const UsersList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [recipient, setRecipient] = useState<User[]>([]);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const handleGetUsers = async () => {
    let result = await adminServices.getUsers();
    console.log(result);
    setUsers(result);
  };

  useEffect(() => {
    handleGetUsers();
  }, []);
  const handleSendMessage = async (message: Message) => {
    const newMessage = await messagesServices.createMessage(message);
    setMessages([...messages, newMessage]);
  };

  const handleDeleteUser = async (id: string) => {
    await authService
      .delete_user(id)
      .then(() => {
        toast.error("utilisateur supprimé !");
      })
      .then(() => {
        handleGetUsers();
      });
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id} className="border-b border-gray-200">
                <td className="px-4 py-2">
                  <FaStar />
                </td>
                <td className="px-4 py-2 flex items-center">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={"http://localhost:8000" + user.image}
                    alt="Avatar"
                  />
                  <div className="ml-2">
                    <div className="font-bold text-gray-900">{user.name}</div>_{" "}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="text-gray-600">{user.email}</div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setRecipient([user]);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-500"
                    >
                      <FaEnvelope />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg"
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <div className="text-gray-600">
          <span>{currentPage}</span>
          <span className="mx-1">/</span>
          <span>{totalPages}</span>
        </div>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg"
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>
      {isModalOpen && (
        <MessageModal
          recipients={recipient}
          onSend={handleSendMessage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UsersList;
