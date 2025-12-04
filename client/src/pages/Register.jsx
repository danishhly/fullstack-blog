import { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-sm space-y-5 p-6"
      >
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Create account</h2>
          <p className="text-xs text-slate-500">Start writing on MonoBlog.</p>
        </div>

        <div className="space-y-3 text-sm">
          <div>
            <label className="mb-1 block text-slate-600">Username</label>
            <input
              className="input"
              placeholder="Your name"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-slate-600">Email</label>
            <input
              className="input"
              type="email"
              placeholder="you@example.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-slate-600">Password</label>
            <input
              className="input"
              type="password"
              placeholder="••••••••"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
        </div>

        <button className="btn-primary w-full">Sign up</button>

        <p className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-slate-900 underline-offset-4 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Register;