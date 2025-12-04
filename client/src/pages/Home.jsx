import { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPosts = async () => {
    try {
      const { data } = await API.get(`/posts?search=${search}&page=${page}&limit=5`);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    fetchPosts();
  }, [search, page]);

  return (
    <div className="page-shell">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Latest posts</h1>
          <p className="text-sm text-slate-500">A calm space for your thoughts.</p>
        </div>
        <Link to="/create" className="btn-primary">
          Create post
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts…"
          className="input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {posts.length === 0 ? (
        <p className="py-16 text-center text-sm text-slate-500">
          Nothing here yet. Start by creating your first post.
        </p>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <article
              key={post._id}
              className="card overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {post.imageURL && (
                <img
                  src={post.imageURL}
                  alt="thumb"
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-4 sm:p-5">
                <h2 className="mb-1 line-clamp-2 text-lg font-semibold text-slate-900">
                  {post.title}
                </h2>
                <p className="mb-3 text-xs text-slate-500">
                  By {post.username} • {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <Link
                  to={`/post/${post._id}`}
                  className="text-sm font-medium text-slate-900 underline-offset-4 hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="mt-8 flex items-center justify-center gap-4 text-sm text-slate-600">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className={`btn-ghost px-3 ${page === 1 ? 'cursor-not-allowed opacity-40' : ''}`}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className={`btn-ghost px-3 ${page >= totalPages ? 'cursor-not-allowed opacity-40' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default Home;