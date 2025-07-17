import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, ShieldCheck, BookOpen, Clock } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/training', label: 'Training', icon: <BookOpen size={20} /> },
    { path: '/predict', label: 'Task Time Prediction', icon: <Clock size={20} /> },
    { path: '/excavationTimer', label: 'Excavation Time Prediction', icon: <Clock size={20} /> },
    { path: '/logging', label: 'Event Log', icon: <Clock size={20} /> }
  ];

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-6 shadow-md flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-yellow-400">Smart Assistant</h2>

      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition duration-300 
              ${location.pathname === item.path
                ? 'bg-yellow-500 text-gray-900 font-semibold'
                : 'hover:bg-gray-700 hover:text-yellow-400'}
            `}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
