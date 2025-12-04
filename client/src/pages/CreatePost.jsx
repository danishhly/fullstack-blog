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
      toast.success('Post Created!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error creating post');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          className="w-full p-2 border rounded" 
          placeholder="Title (5-120 chars)" 
          value={form.title} 
          onChange={e => setForm({...form, title: e.target.value})} 
        />
        <input 
          className="w-full p-2 border rounded" 
          placeholder="Image URL (Optional)" 
          value={form.imageURL} 
          onChange={e => setForm({...form, imageURL: e.target.value})} 
        />
        <textarea 
          className="w-full p-2 border rounded h-40" 
          placeholder="Content (min 50 chars)" 
          value={form.content} 
          onChange={e => setForm({...form, content: e.target.value})} 
        />
        <button className="bg-green-600 text-white px-6 py-2 rounded">Publish</button>
      </form>
    </div>
  );
};
export default CreatePost;