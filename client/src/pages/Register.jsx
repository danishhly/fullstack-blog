import { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <input className="w-full mb-4 p-2 border rounded" placeholder="Username" 
          onChange={(e) => setFormData({...formData, username: e.target.value})} required />
        <input className="w-full mb-4 p-2 border rounded" type="email" placeholder="Email" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <input className="w-full mb-6 p-2 border rounded" type="password" placeholder="Password" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Sign Up</button>
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
};
export default Register;