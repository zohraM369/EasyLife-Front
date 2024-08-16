import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Recipient } from '../../interfaces/RecipientInterface';
import { Message } from '../../interfaces/MessageInterface';
import {useAuth} from '../../context/AuthContext';

interface MessageModalProps {
  recipients: Recipient[];
  onSend: (message: Message) => void;
  onClose: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ recipients, onSend, onClose }) => {
  const [content, setContent] = useState('');
  const {user} = useAuth()
  const [recipientId, setRecipientId] = useState('');
const userId = user?._id ?? user?._id ?? 'defaultUserId';
  const handleSend = () => {
    if (content && recipientId) {
      const message: Message = { user_id: userId, content, recipientId }; 
      onSend(message);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Envoyer un message</h2>
          <button onClick={onClose}>
            <FaTimes className="text-red-500" />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Destinataire</label>
          <select
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
          >
            <option value="" disabled>Sélectionner un destinataire</option>
            {recipients.map((recipient) => (
              <option key={recipient._id} value={recipient._id}>
                {recipient.name} | {recipient.email}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
