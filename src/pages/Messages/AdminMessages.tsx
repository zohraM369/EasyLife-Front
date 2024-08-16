import React, { useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { Message } from '../../interfaces/MessageInterface'; 
import MessageModal from './MessageModal';
import messageService from '../../services/messagesServices'; 
import { useAuth } from '../../context/AuthContext';
import friendService from '../../services/friendsService';



export const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [friends, setFriends] = useState<any[]>([]);

  const { user } = useAuth();

 const fetchFriends = async () => {
    if (user) {
      const userFriends = await friendService.getFriends(user._id);
      setFriends(userFriends);
    }
  };


  useEffect(() => {
    const fetchMessages = async () => {
      const userId = user?._id ?? 'defaultUserId';
      const fetchedMessages = await messageService.getMessagesByUserId(userId);
      setMessages(fetchedMessages);
    };
    fetchFriends()
    fetchMessages();
  }, [user]);

  const handleSendMessage = async (message: Message) => {
    const newMessage = await messageService.createMessage(message);
    setMessages([...messages, newMessage]);
  };

  const handleDeleteMessage = async (id: string) => {
    await messageService.deleteMessage(id);
    setMessages(messages.filter((message) => message._id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8">
      <main className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Boite de réception</h2>
          <ul className="space-y-6">
            {messages.map((message) => (
              <li key={message._id} className="shadow-lg flex items-center p-6 bg-gray-50 rounded-lg shadow-sm">
                <div className="flex-shrink-0 mr-4">
                  <img src={`http://localhost:8000${user?.image}`} alt={user?.name} className="w-16 h-16 rounded-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2 text-gray-500">
                    <FaCalendarAlt className="mr-2" />
                    <span>{new Date(message.created_at).toLocaleDateString()}</span>
                    <FaClock className="ml-4 mr-2" />
                    <span>{new Date(message.created_at).toLocaleTimeString()}</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-700">{message.user_id.name}</h4>
                  <p className="mt-1 text-gray-600">{message.content}</p>
                </div>
                <button onClick={() => handleDeleteMessage(message._id!)} className="ml-4 text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center px-4 py-2 text-blue-500 bg-blue-100 rounded-lg hover:bg-blue-200">
              <FaPlus className="mr-2" /> Ecrire un message
            </button>
          </div>
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

export default AdminMessages;
