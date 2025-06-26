import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/profileStore';

function GuestRoute({ children }) {
  const { isLogin } = useAuthStore();
  const location = useLocation();

  if (isLogin) {
    const redirectTo = location.state?.from?.pathname || '/summary';
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

export default GuestRoute;
