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
    <nav className="bg-white shadow p-4 mb-6">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">MyBlog</Link>
        
        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-black">Feed</Link>
          
          {user ? (
            <>
              <span className="text-gray-500">Hello, {user.username}</span>
              <Link to="/create" className="text-blue-600 hover:underline">Write</Link>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-700">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-3 py-1 rounded">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;