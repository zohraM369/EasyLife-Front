import React from "react";
import Unauthorized from "./Unauthorized";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Unauthorized />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
// <protectedRoute role="admin">

// <admindashboard />
// </protectdrouts>