import React, { createContext, useState, useEffect, useContext } from 'react';
import {  toast } from 'react-toastify';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Task from '../interfaces/TaskInterface';
import taskServices from '../services/TaskServices';
import { useAuth } from './AuthContext';

interface Notification {
  id: number;
  text: string;
}

interface NotificationContextProps {
  notifications: Notification[];
  currentPage: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleDeleteNotification: (id: number) => void;
}


const updateTaskStatusToLate = async (taskId: string,task:Task) => {
  try {
    await taskServices.updateTask(taskId, { ...task,status: "late" });
    console.log(`Task ${taskId} marked as late.`);
  } catch (error) {
    console.error(`Error updating task ${taskId} to late:`, error);
  }
};

const LOCAL_STORAGE_KEY = 'notifications';

const saveNotificationsToLocalStorage = (notifications: Notification[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notifications));
};

const getNotificationsFromLocalStorage = (): Notification[] => {
  const notifications = localStorage.getItem(LOCAL_STORAGE_KEY);
  return notifications ? JSON.parse(notifications) : [];
};

const parseTimeString = (time: string): Date => {
  const [hours, minutes] = time.split('h').map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};
const parseDateTimeString = (date: string, time: string): Date => {
  const [day, month, year] = date.split('/').map(Number);
  const [hours, minutes] = time.split('h').map(Number);
  const dateTime = new Date(year, month - 1, day, hours, minutes, 0, 0);
  return dateTime;
};

const parseTaskDate = (date:string) => {
  const [day, month, year] = date.split("/").map(Number);
  const storedDate = new Date(year, month - 1, day);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  if (storedDate.getTime() === currentDate.getTime()) {
    return true 
  } else {
    false
  } 
}



const scheduleNotification = (
  task: Task,
  message: string,
  timeDifference: number,
  notificationSubject: Subject<Notification>,
  scheduledNotifications: Set<string>
) => {
  const taskStartTime = parseDateTimeString(task.date, task.time).getTime();
  const now = Date.now();
  const notificationTime = taskStartTime - timeDifference;
  const uniqueId = `${task._id}-${message}`;

  if (notificationTime > now && !scheduledNotifications.has(uniqueId)) {
    const delay = notificationTime - now;

    setTimeout(() => {
      const notificationText = `La tâche "${task.title}" commence dans ${message}`;
      notificationSubject.next({ id: Date.now(), text: notificationText });
      toast.info(notificationText); 
    }, delay);

    scheduledNotifications.add(uniqueId);
  } else {
    console.warn(`Notification for task "${task.title}" is in the past or already scheduled.`);
  }
};

const itemsPerPage = 3;

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasks, setTasks] = useState<Task[]>([]);
  const scheduledNotifications = useState<Set<string>>(new Set())[0];
  const notificationSubject = useState(new Subject<Notification>())[0];
  const { user } = useAuth();
  const user_id = user?._id ? user._id : 'undefined';

  const fetchTasks = async () => {
    try {
      const response = await taskServices.getUserTasks(user_id);
      console.log('Fetched tasks:', response);
      setTasks(response);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const unsubscribe$ = new Subject<void>();

    notificationSubject
      .pipe(takeUntil(unsubscribe$))
      .subscribe((notification) => {
        setNotifications((prevNotifications) => {
          const newNotifications = [...prevNotifications, notification];
          saveNotificationsToLocalStorage(newNotifications);
          return newNotifications;
        });
      });

    tasks.forEach((task) => {
      const intervals = [
        { message: '24 heures', timeDifference: 24 * 60 * 60 * 1000 },
        { message: '6 heures', timeDifference: 6 * 60 * 60 * 1000 },
        { message: '1 heure', timeDifference: 60 * 60 * 1000 },
        { message: '30 minutes', timeDifference: 30 * 60 * 1000 },
        { message: 'maintenant', timeDifference: 0 },
      ];

      intervals.forEach(({ message, timeDifference }) => {
        scheduleNotification(task, message, timeDifference, notificationSubject, scheduledNotifications);
      });
      const taskStartTime = parseTimeString(task.time).getTime();
  const now = Date.now();
       if (( parseTaskDate(task.date) && taskStartTime < now && task.status !== "done") || (parseTaskDate(task.date) && taskStartTime < now && task.status !== "active")) {
    updateTaskStatusToLate(task._id,task).then(()=>{
          toast.warn(`La tâche ${task.title} est en retard !`)
    })
  } 
    });

    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [tasks]);

  useEffect(() => {
    const storedNotifications = getNotificationsFromLocalStorage();
    setNotifications(storedNotifications);
  }, []);

  const totalPages = Math.ceil(notifications.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleDeleteNotification = (id: number) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    
    setNotifications(updatedNotifications);
    saveNotificationsToLocalStorage(updatedNotifications); 
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        currentPage,
        totalPages,
        handlePrevPage,
        handleNextPage,
        handleDeleteNotification,
      }}
    >
      {children}
      
    </NotificationContext.Provider>
  );
};

const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export { NotificationProvider, useNotification };