import { Link, useLocation } from 'react-router-dom';

const NavigationComponent = () => {

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="border-b border-gray-300 mb-6 flex space-x-8 text-sm font-semibold">
      <Link
        to="/admin"
        className={`text-base pb-2 focus:outline-none ${
          currentPath === '/admin'
            ? 'text-[#2a6eb8] border-b-2 border-blue-700'
            : 'text-[#212529]'
        }`}
      >
        Summary History
      </Link>

      <Link
        to="/activity-logs"
        className={`text-base pb-2 focus:outline-none cursor-pointer ${
          currentPath === '/activity-logs'
            ? 'text-[#2a6eb8] border-b-2 border-blue-700'
            : 'text-[#212529]'
        }`}
      >
        Activity Logs
      </Link>
      <Link
        to="/user-management"
        className={`text-base pb-2 focus:outline-none cursor-pointer ${
          currentPath === '/user-management'
            ? 'text-[#2a6eb8] border-b-2 border-blue-700'
            : 'text-[#212529]'
        }`}
      >
        User Management
      </Link>
    </nav>
  );
};

export default NavigationComponent;