import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../store/profileStore";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };
  return (
    <header className="flex items-center justify-between px-10 py-7 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-4">
        <button aria-label="Menu" className="text-blue-600 text-2xl focus:outline-none">
          <i className="fas fa-bars"></i>
        </button>
        <span className="font-bold text-[#2a6eb8] text-xl select-none">Thomson Medical</span>
      </div>
      <div className="flex items-center space-x-4 text-sm">
        <span className="font-semibold text-black">
          {user?.username}
        </span>
        <span className="uppercase bg-[#2a6eb8] text-white text-xs font-semibold px-3 py-1 rounded-full select-none">
          {user?.role}
        </span>
        <button className="border border-blue-600 text-blue-600 cursor-pointer rounded px-4 py-1 text-sm font-normal hover:bg-blue-50 focus:outline-none" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;