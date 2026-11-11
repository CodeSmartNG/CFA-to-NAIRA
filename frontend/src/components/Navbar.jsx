import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/login');
  };

  if (!user) return null;

  const links = user.role === 'admin'
    ? [
        { to: '/admin', label: 'Overview' },
        { to: '/admin/requests', label: 'Requests' },
        { to: '/admin/rates', label: 'Rates' },
      ]
    : [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/exchange/new', label: 'New Exchange' },
        { to: '/exchange/history', label: 'History' },
      ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="font-bold text-brand-600">
          CFA-CHANGE
        </Link>
        <div className="flex items-center gap-1">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/admin'}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm ${isActive
                  ? 'bg-brand-50 text-brand-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <span className="mx-2 text-sm text-gray-400">|</span>
          <span className="text-sm text-gray-600 mr-2 hidden sm:inline">{user.fullName}</span>
          <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
