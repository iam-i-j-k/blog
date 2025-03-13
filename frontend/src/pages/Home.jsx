import { useState, useEffect } from "react";
import axios from "axios";
import "./blog-styles.css";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);

  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    axios.get(`${import.meta.env.BACKEND_URL}/api/blogs`).then(res => setBlogs(res.data));
  }, []);

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>All Blogs</h1>
        <button onClick={handleLogin} className="login-button">Login</button>
      </div>

      {/* Blog List */}
      <div className="blog-list">
        {blogs.map(blog => (
          <div key={blog._id} className="blog-card">
            <h2>{blog.title}</h2>
            <p>{blog.content.substring(0, 100)}...</p>
            <small>By {blog.author.username}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
