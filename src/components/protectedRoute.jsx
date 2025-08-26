import { useEffect, useState } from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") ?? "none"
  );

  console.log(isAuthenticated);
  useEffect(() => {}, []);

  if (isAuthenticated !== "auth") {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
