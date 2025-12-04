import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-6">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            N
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold text-slate-900">MonoBlog</span>
            <span className="text-xs text-slate-500">Calm writing space</span>
          </div>
        </Link>

        {/* Nav / actions */}
        <div className="flex items-center gap-6 text-sm">
          <Link to="/" className="text-slate-600 transition hover:text-slate-900">
            Feed
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/create" className="btn-primary px-5 py-2 text-xs sm:text-sm">
                New post
              </Link>
              <button
                onClick={handleLogout}
                className="btn-ghost px-5 py-2 text-xs text-red-500 hover:bg-red-50 hover:text-red-600 sm:text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-slate-600 transition hover:text-slate-900">
                Login
              </Link>
              <Link
                to="/register"
                className="btn-primary px-5 py-2 text-xs sm:text-sm"
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;