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
      login(data.token, data.user);
      toast.success(`Welcome back, ${data.user.username}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-sm space-y-5 p-6"
      >
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Log in</h2>
          <p className="text-xs text-slate-500">Welcome back to MonoBlog.</p>
        </div>

        <div className="space-y-3 text-sm">
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

        <button className="btn-primary w-full">Login</button>

        <p className="text-center text-xs text-slate-500">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-slate-900 underline-offset-4 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Login;