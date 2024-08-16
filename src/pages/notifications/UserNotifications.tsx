import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaCircle } from 'react-icons/fa6';
import { useNotification } from '../../context/NotificationContext'; 

const UserNotifications: React.FC = () => {
  const {
    notifications,
    currentPage,
    totalPages,
    handlePrevPage,
    handleNextPage,
    handleDeleteNotification,
  } = useNotification();

  const uniqueNotifications = Array.from(
    new Map(
      notifications.map(notification => [notification.text, notification])
    ).values()
  );

  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNotifications = uniqueNotifications.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark w-full p-4 bg-white rounded-lg shadow-md">
      <h1 className='font-bold text-blue-500 text-md'>Les Notifications</h1>
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <tbody>
            {currentNotifications.map((notification) => (
              <tr key={notification.id} className="border-b border-gray-200">
                <td className="px-4 py-2">
                  <FaCircle />
                </td>
                <td className="px-4 py-2 flex items-center">
                  <div className="ml-2">
                    <div className="font-bold text-gray-900">{notification.text}</div>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteNotification(notification.id)}
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
          Précedent
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
    </div>
  );
};

export default UserNotifications;