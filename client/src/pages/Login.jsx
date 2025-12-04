import { useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', formData);
      login(data.token, data.user); // Save to context & localStorage
      toast.success(`Welcome back, ${data.user.username}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input className="w-full mb-4 p-2 border rounded" type="email" placeholder="Email" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <input className="w-full mb-6 p-2 border rounded" type="password" placeholder="Password" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Login</button>
        <p className="mt-4 text-center text-sm">
          Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
        </p>
      </form>
    </div>
  );
};
export default Login;