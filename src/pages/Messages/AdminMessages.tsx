import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaClock, FaCalendarAlt } from "react-icons/fa";
import { Message } from "../../interfaces/MessageInterface";
import MessageModal from "./MessageModal";
import messageService from "../../services/messagesServices";
import { useAuth } from "../../context/AuthContext";
import friendService from "../../services/friendsService";
import { FaMessage } from "react-icons/fa6";
import adminServices from "../../services/adminServices";

export const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [peopleTalkedWith, setPeopleTalkedWith] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [friends, setFriends] = useState<any[]>([]);

  const { user } = useAuth();

  const fetchFriends = async () => {
    if (user) {
      const userFriends = await adminServices.getUsers();
      setFriends(userFriends.filter(el=>el._id != user._id));
    }
  };

  const handleGetPeopleTalkedWith = async (id: string) => {
    let data = await messageService.getPeopleTalkedWith(id);
    setPeopleTalkedWith(data);
    console.log(data);
  };

  useEffect(() => {
    handleGetPeopleTalkedWith(user._id);
  }, [user, messages]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const handleSendMessage = async (message: Message) => {
    await messageService.createMessage(message);
    setMessages([]);
  };

  const handleDeleteMessage = async (id: string) => {
    await messageService.deleteMessage(id);
    setMessages(messages.filter((message) => message._id !== id));
  };

  const handleGetMessages = async (id: string, x: string) => {
    let data = await messageService.getPeopleChat(id, x);
    console.log(data, { id: id, x: x });
    setMessages(data);
  };

  const uniquePeopleTalkedWith = peopleTalkedWith.filter((el, index, self) => {
    const key = [el.user_id._id, el.recipientId._id].sort().join("-");
    return (
      self.findIndex((e) => {
        const compareKey = [e.user_id._id, e.recipientId._id].sort().join("-");
        return compareKey === key;
      }) === index
    );
  });

  const handleRespond = async (id: any) => {
    let message = { user_id: user._id, content: textMessage, recipientId: id };
    await messageService.createMessage(message);
    setMessages([]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8">
      <main className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <section className="mb-8">
          <div className="flex items-center justify-around">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Liste des discussions
            </h2>
            <div className="mb-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 text-blue-500 bg-blue-100 rounded-lg hover:bg-blue-200"
              >
                <FaPlus className="mr-2" /> Nouveau message
              </button>
            </div>
          </div>

          {uniquePeopleTalkedWith.length > 0 &&
            uniquePeopleTalkedWith.map((el) => {
              return (
                <button
                  onClick={() =>
                    handleGetMessages(
                      user._id,
                      el.recipientId._id == user._id
                        ? el.user_id._id
                        : el.recipientId._id
                    )
                  }
                  className="text-white bg-blue-500 mx-2 px-2 py-4 rounded"
                >
                  <img
                    className="h-10 rounded"
                    src={
                      user._id == el.user_id._id
                        ? `http://localhost:8000${el.recipientId.image}`
                        : `http://localhost:8000${el.user_id.image}`
                    }
                  />
                  <span>
                    {user._id == el.user_id._id
                      ? el.recipientId.name
                      : el.user_id.name}
                  </span>
                </button>
              );
            })}
        </section>
        <section>
          <ul className="space-y-6">
            {messages.length > 0 &&
              messages.map((message) => (
                <li
                  key={message._id}
                  className="shadow-lg flex items-center p-6 bg-gray-50 rounded-lg shadow-sm"
                >
                  <div className="flex-shrink-0 mr-4">
                    <img
                      src={`http://localhost:8000${message.user_id?.image}`}
                      alt={user?.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2 text-gray-500">
                      <FaCalendarAlt className="mr-2" />
                      <span>
                        {new Date(message.created_at).toLocaleDateString()}
                      </span>
                      <FaClock className="ml-4 mr-2" />
                      <span>
                        {new Date(message.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-700">
                      {message.user_id.name == user.name
                        ? "Moi"
                        : message.user_id.name}
                    </h4>
                    <p className="mt-1 text-gray-600">{message.content}</p>
                  </div>
                  {/* <button onClick={() => handleDeleteMessage(message._id!)} className="ml-4 text-red-500 hover:text-red-700">
                  <FaTrash />
                </button> */}
                </li>
              ))}
            {messages.length > 0 && (
              <div className="flex justify-center">
                {" "}
                <span className="mx-1">Répondre</span>
                <input
                  onChange={(e) => setTextMessage(e.target.value)}
                  className="border-1 border"
                  type="text"
                />
                <button
                  onClick={() =>
                    handleRespond(
                      messages[0].recipientId._id == user._id
                        ? messages[0].user_id._id
                        : messages[0].recipientId._id
                    )
                  }
                  className="ml-4 text-blue-500 hover:text-blue-700"
                >
                  <FaMessage />
                </button>{" "}
              </div>
            )}
          </ul>
        </section>
      </main>
      {isModalOpen && (
        <MessageModal
          recipients={friends}
          onSend={handleSendMessage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Messages;
