import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${import.meta.env.BACKEND_URL}/api/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setTitle(res.data.title);
      setContent(res.data.content);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${import.meta.env.BACKEND_URL}/api/blogs${id}`, { title, content }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea value={content} onChange={e => setContent(e.target.value)} required></textarea>
      <button type="submit">Update</button>
    </form>
  );
}

export default EditBlog;
