import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import toast from 'react-hot-toast';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', imageURL: '' });

  useEffect(() => {
    API.get(`/posts/${id}`).then(res => {
      setForm({ title: res.data.title, content: res.data.content, imageURL: res.data.imageURL });
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/posts/${id}`, form);
      toast.success("Post updated!");
      navigate(`/post/${id}`);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input className="w-full p-2 border rounded" value={form.title} 
          onChange={e => setForm({...form, title: e.target.value})} />
        <input className="w-full p-2 border rounded" value={form.imageURL} 
          onChange={e => setForm({...form, imageURL: e.target.value})} />
        <textarea className="w-full p-2 border rounded h-40" value={form.content} 
          onChange={e => setForm({...form, content: e.target.value})} />
        <button className="bg-blue-600 text-white px-6 py-2 rounded">Update</button>
      </form>
    </div>
  );
};
export default EditPost;