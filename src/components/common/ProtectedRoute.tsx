import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/store/hook";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: number;
}

export function ProtectedRoute({ children, requiredRole = 3}: ProtectedRouteProps) {
  const { user } = useAppSelector((state) => state.auth);

  // Not logged in - redirect to login  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role - redirect to login
  if (requiredRole && user.role !== 3) {
    return <Navigate to="/login" replace />;
  }

  // All checks passed
  return <>{children}</>;
}
