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
      .then((res) => setPost(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await API.delete(`/posts/${id}`);
      toast.success('Post deleted');
      navigate('/');
    } catch (err) {
      toast.error('Failed to delete post');
    }
  };

  if (!post) {
    return (
      <div className="page-shell">
        <div className="py-16 text-center text-sm text-slate-500">Loading…</div>
      </div>
    );
  }

  const isOwner = user && user.id === post.authorId;

  return (
    <div className="page-shell">
      <article className="card overflow-hidden">
        {post.imageURL && (
          <img
            src={post.imageURL}
            alt={post.title}
            className="h-64 w-full object-cover"
          />
        )}

        <div className="p-5 sm:p-7">
          <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="mb-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
                {post.title}
              </h1>
              <p className="text-xs text-slate-500">
                By <span className="font-medium text-slate-700">{post.username}</span>{' '}
                • {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>

            {isOwner && (
              <div className="flex gap-2">
                <Link
                  to={`/edit/${post._id}`}
                  className="btn-ghost text-xs text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="btn-ghost text-xs text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </header>

          <hr className="mb-4 border-slate-100" />

          <div className="prose max-w-none whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
            {post.content}
          </div>
        </div>
      </article>
    </div>
  );
};
export default PostDetail;