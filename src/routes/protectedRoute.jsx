import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/profileStore';

function ProtectedRoute({ children }) {
  const { isLogin } = useAuthStore();
  const location = useLocation();

  if (!isLogin) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
