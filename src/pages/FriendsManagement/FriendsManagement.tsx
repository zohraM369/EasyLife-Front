import React, { useState, useEffect } from "react";
import { FaTrash, FaUserPlus } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { friendService } from "../../services/friendsService";
import { ToastContainer } from "react-toastify";

const FriendsManager: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"add" | "requests">("add");
  const [email, setEmail] = useState("");
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);

  useEffect(() => {
    fetchFriendRequests();
    fetchFriends();
  }, []);

  const fetchFriendRequests = async () => {
    if (user) {
      const requests = await friendService.getFriendRequests(user._id);
      setFriendRequests(requests);
      console.log(requests);
    }
  };

  const fetchFriends = async () => {
    if (user) {
      const userFriends = await friendService.getFriends(user._id);
      setFriends(userFriends);
    }
  };

  const handleSendRequest = async () => {
    if (user && email) {
      await friendService.sendFriendRequest(user._id, email);
      setEmail("");
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    await friendService.acceptFriendRequest(requestId);
    fetchFriendRequests();
    fetchFriends();
  };

  const handleDeleteFriend = async (friendId: string) => {
    let data = { friendId: friendId, userId: user._id };
    await friendService.deleteFriend(data);
    fetchFriends();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8">
      <ToastContainer />
      <main className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-8 flex justify-center">
          <button
            onClick={() => setActiveTab("add")}
            className={`px-4 py-2 mr-2 ${
              activeTab === "add" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Ajouter des amis
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 ${
              activeTab === "requests"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Demandes amitiés
          </button>
        </div>

        {activeTab === "add" ? (
          <div className="flex flex-col items-center">
            <div className="flex w-full mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email to add friend"
                className="flex-1 p-2 border border-gray-300 rounded-l-lg"
              />
              <button
                onClick={handleSendRequest}
                className="px-4 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600"
              >
                <FaUserPlus />
              </button>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Liste d'amis</h3>
            <ul className="w-full space-y-4">
              {friends.map((friend) => (
                <li
                  key={friend._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
                >
                  <div className="flex items-center">
                    <img
                      src={`http://localhost:8000${friend.image}`}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="text-lg font-semibold">{friend.name}</h4>
                      <p className="text-gray-500">{friend.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteFriend(friend._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-4">Demande d'amitiés</h3>
            <ul className="w-full space-y-4">
              {friendRequests.map((request) => (
                <li
                  key={request._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
                >
                  <div className="flex items-center">
                    <img
                      src={`http://localhost:8000${request.requester.image}`}
                      alt={request.requester.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="text-lg font-semibold">
                        {request.requester.name}
                      </h4>
                      <p className="text-gray-500">{request.requester.email}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAcceptRequest(request._id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Accepter
                    </button>
                    <button
                      onClick={() => handleDeleteFriend(request._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Refuser
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default FriendsManager;
