import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    
    try {
      await API.delete(`/posts/${id}`);
      toast.success("Post deleted");
      navigate('/');
    } catch (err) {
      toast.error("Failed to delete post");
    }
  };

  if (!post) return <div className="text-center mt-10">Loading...</div>;

  // KEY LOGIC: Check ownership
  const isOwner = user && user.id === post.authorId;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded mt-6">
      {post.imageURL && (
        <img src={post.imageURL} alt={post.title} className="w-full h-64 object-cover rounded mb-6" />
      )}
      
      <div className="flex justify-between items-start">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>
        {isOwner && (
          <div className="flex gap-2">
            <Link to={`/edit/${post._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</Link>
            <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
          </div>
        )}
      </div>

      <p className="text-gray-500 text-sm mb-6">
        By <span className="font-semibold">{post.username}</span> on {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
        {post.content}
      </div>
    </div>
  );
};
export default PostDetail;