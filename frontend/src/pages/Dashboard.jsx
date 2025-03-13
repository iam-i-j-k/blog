import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import "../styles/dashboard.css";


function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setBlogs(res.data));
  }, []);

  const deleteBlog = async (id) => {
    await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setBlogs(blogs.filter(blog => blog._id !== id));
  };

  return (
    <div cnmae="dashboard-container">
      <h1>Your Blogs</h1>
      <LogoutButton />
      <button onClick={() => navigate("/create-blog")}>Create New Blog</button>
      {blogs.map(blog => (
        <div key={blog._id} className="blog-card">
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <div className="actions">
            <button onClick={() => navigate(`/edit-blog/${blog._id}`)}>Edit</button>
            <button onClick={() => deleteBlog(blog._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
