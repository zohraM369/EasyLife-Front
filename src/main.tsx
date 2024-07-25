// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  RouteObject,
} from "react-router-dom";
import { FORGOT_PASSWORD, HOME, LOGIN, REGISTER } from "./routes/routes";
import { AuthLayout } from "./layouts/AuthLayout";
import { Landing } from "./pages/Landing/Landing";
import { Register } from "./pages/auth/Register";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { Login } from "./pages/auth/Login";

const routes: RouteObject[] = [
  {
    path: HOME,
    element: <AuthLayout />,
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
    ],
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
