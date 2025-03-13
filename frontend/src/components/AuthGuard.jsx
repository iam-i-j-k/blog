import { Navigate } from "react-router-dom";

function AuthGuard({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default AuthGuard;
