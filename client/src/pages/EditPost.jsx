import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import toast from 'react-hot-toast';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', imageURL: '' });

  useEffect(() => {
    API.get(`/posts/${id}`).then((res) => {
      setForm({
        title: res.data.title,
        content: res.data.content,
        imageURL: res.data.imageURL,
      });
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/posts/${id}`, form);
      toast.success('Post updated!');
      navigate(`/post/${id}`);
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="page-shell">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Edit post</h2>
        <p className="text-xs text-slate-500">
          Refine your writing with small changes.
        </p>
      </div>

      <form onSubmit={handleUpdate} className="card space-y-4 p-5">
        <input
          className="input"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="input"
          value={form.imageURL}
          onChange={(e) => setForm({ ...form, imageURL: e.target.value })}
        />

        <textarea
          className="input h-40 resize-none"
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
          <button className="btn-primary text-sm">Update</button>
        </div>
      </form>
    </div>
  );
};
export default EditPost;