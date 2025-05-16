const Blog = require("../Models/BlogModel");
const User = require("../Models/userModel");

exports.createBlog = async (req, res) => {
  const userId = req.userId;
  const { title, description, body, tags } = req.body;

  if (!title || !description || !body)
    return res.status(400).json("Input error");

  try {
    const blog = new Blog({ title, description, body, tags, author: userId });
    const savedBlog = await blog.save();

    const user = await User.findById(userId);
    user.Blogs.push(savedBlog._id);
    await user.save();

    res.status(201).json({ message: "Blog created" });
  } catch (error) {
    res.status(500).json({ error: "Error creating blog" });
  }
};

exports.getBlogsByTags = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("prefferedTags");
    const blogs = await Blog.find({ tags: { $in: user.prefferedTags } });
    res.status(200).json({ message: "Blogs fetched", blogs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
};
