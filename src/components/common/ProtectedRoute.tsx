import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/store/hook";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export function ProtectedRoute({ children, requiredRole = "admin" }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // Not logged in - redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role - redirect to login
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  // All checks passed
  return <>{children}</>;
}
