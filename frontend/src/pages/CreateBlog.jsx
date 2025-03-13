import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting blog post");
      await axios.post("http://localhost:5000/api/blogs", { title, content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("There was an error creating the blog:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Content" onChange={e => setContent(e.target.value)} required></textarea>
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateBlog;