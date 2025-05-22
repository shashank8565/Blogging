const Blog = require("../Models/BlogModel");
const User = require("../Models/userModel");

exports.createBlog = async (req, res) => {
  console.log("Received:", req.body);
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
    console.log(user);
    const blogs = await Blog.find({
      tags: { $in: user.prefferedTags },
    })
      .sort({ createdAt: -1 }) // must come before populate
      .populate("author", "username");
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      console.error("Error occuerd");
    }
    const blog = await Blog.findById(id).populate("author", "username");
    res.status(200).json({ Blog: blog });
  } catch (err) {
    res.status(404).json({ message: "not found" });
    console.log(err);
  }
};
