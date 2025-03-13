import express from "express";
import Blog from "../models/Blog.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Ensure it removes 'Bearer'
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

router.post("/", auth, async (req, res) => {
  console.log("POST /api/blogs route hit"); // Add this line
  console.log("Request body:", req.body); // Add this line
  const { title, content } = req.body;
  const blog = await Blog.create({ title, content, author: req.user.id });
  res.json(blog);
});

router.get("/", async (req, res) => {
  console.log("GET /api/blogs route hit"); // Add this line
  const blogs = await Blog.find().populate("author", "username");
  res.json(blogs);
});

router.put("/:id", auth, async (req, res) => {
  console.log("PUT /api/blogs/:id route hit"); // Add this line
  const blog = await Blog.findById(req.params.id);
  if (!blog || blog.author.toString() !== req.user.id)
    return res.status(403).json({ message: "Forbidden" });
  blog.title = req.body.title;
  blog.content = req.body.content;
  await blog.save();
  res.json(blog);
});

router.delete("/:id", auth, async (req, res) => {
  console.log("DELETE /api/blogs/:id route hit"); // Add this line
  const blog = await Blog.findById(req.params.id);
  if (!blog || blog.author.toString() !== req.user.id)
    return res.status(403).json({ message: "Forbidden" });
  await blog.deleteOne();
  res.json({ message: "Blog deleted" });
});

export default router;