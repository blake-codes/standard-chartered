import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

interface ProtectedRouteProps {
  redirectTo: string;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectTo,
  requireAdmin = false,
}) => {
  const { username } = useAuth();

  if (!username) {
    return <Navigate to={redirectTo} />;
  }

  if (requireAdmin && username !== "admin") {
    alert("Access Denied: Admins Only!");
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
