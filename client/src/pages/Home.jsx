import { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  // 1. Add State for Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPosts = async () => {
    try {
      // 2. Pass the 'page' state to the API
      const { data } = await API.get(`/posts?search=${search}&page=${page}&limit=5`);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Reset to page 1 if search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  // 4. Fetch when page or search changes
  useEffect(() => {
    fetchPosts();
  }, [search, page]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Feed</h1>
        <Link to="/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create Post</Link>
      </div>

      <input 
        type="text" 
        placeholder="Search posts..." 
        className="w-full p-2 border mb-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map(post => (
            <div key={post._id} className="bg-white p-4 rounded shadow hover:shadow-md transition">
               {post.imageURL && <img src={post.imageURL} alt="thumb" className="w-full h-48 object-cover mb-2 rounded"/>}
               <h2 className="text-xl font-semibold">{post.title}</h2>
               <p className="text-gray-500 text-sm mb-2">By {post.username} • {new Date(post.createdAt).toLocaleDateString()}</p>
               <Link to={`/post/${post._id}`} className="text-blue-500 font-medium hover:underline">Read More →</Link>
            </div>
          ))}
        </div>
      )}

      {/* 5. Pagination Controls */}
      <div className="flex justify-center gap-4 mt-8">
        <button 
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          Previous
        </button>
        
        <span className="self-center text-gray-600">
          Page {page} of {totalPages}
        </span>

        <button 
          disabled={page >= totalPages}
          onClick={() => setPage(p => p + 1)}
          className={`px-4 py-2 rounded ${page >= totalPages ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default Home;