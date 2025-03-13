"use client"

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./create-blog.css"

function CreateBlog() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      await axios.post(
        `${import.meta.env.BACKEND_URL}/api/blogs`,
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      navigate("/dashboard")
    } catch (error) {
      console.error("There was an error creating the blog:", error)
      setError("Failed to create blog. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="create-blog-container">
      <div className="create-blog-card">
        <div className="create-blog-header">
          <h1>Create New Blog</h1>
          <p>Share your thoughts with the world</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="create-blog-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter a catchy title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              placeholder="Write your blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => navigate("/dashboard")}>
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateBlog

