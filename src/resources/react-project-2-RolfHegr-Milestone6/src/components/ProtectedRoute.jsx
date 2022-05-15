import React from "react";
import { Navigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";

export default function ProtectedRoute({ children }) {
  const { activeUser } = useAuthContext();

  if (!activeUser) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
