import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import LogoutButton from "../components/LogoutButton"
import "../styles/dashboard.css"

function Dashboard() {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true)
        const res = await axios.get(`${import.meta.env.BACKEND_URL}/api/blogs`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setBlogs(res.data)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load blogs")
        setIsLoading(false)
        console.error("Error fetching blogs:", err)
      }
    }

    fetchBlogs()
  }, [token])

  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`${import.meta.env.BACKEND_URL}/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setBlogs(blogs.filter((blog) => blog._id !== id))
      } catch (err) {
        console.error("Error deleting blog:", err)
      }
    }
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Your Blogs</h1>
          <div className="header-actions">
            <button className="create-button" onClick={() => navigate("/create-blog")}>
              Create New Blog
            </button>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        {isLoading ? (
          <div className="loading-state">Loading your blogs...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : blogs.length === 0 ? (
          <div className="empty-state">
            <p>You haven't created any blogs yet.</p>
            <button className="create-button" onClick={() => navigate("/create-blog")}>
              Create Your First Blog
            </button>
          </div>
        ) : (
          <div className="blogs-grid">
            {blogs.map((blog) => (
              <div key={blog._id} className="blog-card">
                <div className="blog-content">
                  <h2 className="blog-title">{blog.title}</h2>
                  <p className="blog-text">{blog.content}</p>
                </div>
                <div className="blog-actions">
                  <button className="edit-button" onClick={() => navigate(`/edit-blog/${blog._id}`)}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => deleteBlog(blog._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard

