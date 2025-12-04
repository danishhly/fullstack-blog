import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreatePost = () => {
  const [form, setForm] = useState({ title: '', content: '', imageURL: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/posts', form);
      toast.success('Post created!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error creating post');
    }
  };

  return (
    <div className="page-shell">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">New post</h2>
        <p className="text-xs text-slate-500">
          Share something meaningful in a clean space.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-4 p-5">
        <input
          className="input"
          placeholder="Title (5–120 characters)"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="input"
          placeholder="Image URL"
          value={form.imageURL}
          onChange={(e) => setForm({ ...form, imageURL: e.target.value })}
        />

        <textarea
          className="input h-40 resize-none"
          placeholder="Write your story…"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-ghost text-sm"
          >
            Cancel
          </button>
          <button className="btn-primary text-sm">Publish</button>
        </div>
      </form>
    </div>
  );
};
export default CreatePost;