// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  RouteObject,
} from "react-router-dom";
import ProtectedRoute from "./layouts/ProtectedRoute";

import {
  ADDTASK,
  ADMINDASHBOARD,
  ADMINMESSAGES,
  ADMINSETTINGS,
  ADMINUSERS,
  CALENDAR,
  CHART,
  COMINGTASKS,
  DASHBOARD,
  FORGOT_PASSWORD,
  FORM_ELEMENTS,
  FORM_LAYOUT,
  FRIENDSMANAGEMENT,
  HOME,
  LOGIN,
  MESSAGES,
  NOTIFICATIONS,
  REGISTER,
  RESETPASSWORD,
  SETTINGS,
  TABLES,
  TASKMANAGEMENT,
  UI_ALERTS,
  UI_BUTTONS,
  UPDATE_CITY,
  UPDATE_EMAIL,
  UPDATE_NAME,
  UPDATE_PASSWORD,
  UPDATETASK,
  USERTASKS,
} from "./routes/routes";
import { AuthLayout } from "./layouts/AuthLayout";
import { UserLayout } from "./layouts/UserLayout";
import { Landing } from "./pages/Landing/Landing";
import { Register } from "./pages/auth/Register";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { Login } from "./pages/auth/Login";
import { ResetPassword } from "./pages/auth/ResetPassword";
import "./css/style.css";
import "./css/satoshi.css";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import Calendar from "./pages/Calendar";

import Settings from "./pages/Settings";
import Chart from "./pages/Chart";
import Buttons from "./pages/UiElements/Buttons";
import Alerts from "./pages/UiElements/Alerts";
import { AddTask } from "./pages/tasks/AddTask";
import { Messages } from "./pages/Messages/Messages";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import { AdminLayout } from "./layouts/AdminLayout";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import UsersList from "./pages/UsersList/UsersList";
import AdminMessages from "./pages/Messages/AdminMessages";
import { UserNotifications } from "./pages/notifications/UserNotifications";
import UserTasks from "./pages/tasks/UserTasks";
import ComingTasks from "./pages/tasks/ComingTasks";
import TaskManagement from "./pages/tasks/TaskManagement";
import { NotificationProvider } from "./context/NotificationContext";
import { UpdateEmail } from "./pages/Profile Management/UpdateEmail";
import { UpdatePassword } from "./pages/Profile Management/UpdatePassword";
import { UpdateName } from "./pages/Profile Management/UpdateName";
import { AuthProvider } from "./context/AuthContext";
import FriendsManager from "./pages/FriendsManagement/FriendsManagement";
import { UpdateCity } from "./pages/Profile Management/UpdateCity";
import { UpdateTask } from "./pages/tasks/UpdateTask";
import AdminSettings from "./pages/AdminSettings";
const routes: RouteObject[] = [
  {
    path: HOME,
    element: (
      <AuthProvider>
        <AuthLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: HOME,
        element: <Landing />,
      },
      {
        path: LOGIN,
        element: <Login />,
      },
      {
        path: REGISTER,
        element: <Register />,
      },
      {
        path: FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: RESETPASSWORD,
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: DASHBOARD,
    element: (
      <AuthProvider>
        <NotificationProvider>
          <ProtectedRoute allowedRoles={["admin", "user"]}>
            <UserLayout />
          </ProtectedRoute>
        </NotificationProvider>
      </AuthProvider>
    ),
    children: [
      {
        path: "/dashboard",
        element: <UserDashboard />,
      },
      {
        path: TASKMANAGEMENT,
        element: <TaskManagement />,
      },
      {
        path: FRIENDSMANAGEMENT,
        element: <FriendsManager />,
      },
      {
        path: CALENDAR,
        element: <Calendar events={[]} />,
      },
      {
        path: ADDTASK,
        element: <AddTask />,
      },
      {
        path: UPDATETASK,
        element: <UpdateTask />,
      },
      {
        path: MESSAGES,
        element: <Messages />,
      },
      {
        path: UPDATE_EMAIL,
        element: <UpdateEmail />,
      },
      {
        path: UPDATE_NAME,
        element: <UpdateName />,
      },
      {
        path: UPDATE_CITY,
        element: <UpdateCity />,
      },
      {
        path: UPDATE_PASSWORD,
        element: <UpdatePassword />,
      },

      {
        path: USERTASKS,
        element: <UserTasks />,
      },
      {
        path: COMINGTASKS,
        element: <ComingTasks />,
      },
      {
        path: NOTIFICATIONS,
        element: <UserNotifications />,
      },
      {
        path: SETTINGS,
        element: <Settings />,
      },
      {
        path: CHART,
        element: <Chart />,
      },
      {
        path: UI_BUTTONS,
        element: <Buttons />,
      },
      {
        path: UI_ALERTS,
        element: <Alerts />,
      },
    ],
  },
  {
    path: ADMINDASHBOARD,
    element: (
      <AuthProvider>
        <NotificationProvider>
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        </NotificationProvider>
      </AuthProvider>
    ),
    children: [
      {
        path: "/admin_dashboard",
        element: <AdminDashboard />,
      },
      {
        path: ADMINUSERS,
        element: <UsersList />,
      },
      {
        path: ADMINMESSAGES,
        element: <AdminMessages />,
      },
      {
        path: ADMINSETTINGS,
        element: <AdminSettings />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
