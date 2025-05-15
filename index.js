const express = require("express");
const bcrypt = require("bcrypt");
const { connectDB } = require("./config/DB");
const Blog = require("./Models/BlogModel");
const User = require("./Models/userModel");

require("dotenv").config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT;
connectDB();

//userRegistration

app.post("/SignUp", async (req, res) => {
  const { email, username, password } = req.body;

  const hashedpass = await bcrypt.hash(password, 10);
  console.log(hashedpass);

  try {
    const user = new User({
      email,
      username,
      password: hashedpass,
    });

    await user.save();
    res.status(201).json({ message: "user created" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
      throw new Error("Username not found");
    }

    const ispassValid = await bcrypt.compare(password, user.password);

    if (ispassValid) {
      res.status(200).json({ message: "Logged in successfully" });
    } else {
      throw new Error("Password is incorrect");
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/create", async (req, res) => {
  const { title, description, body, userId } = req.body;
  if (!title && !description && !body && !createdBy) {
    res.status(204).json("Input error");
  }
  try {
    const blog = new Blog({
      title,
      description,
      body,
      author: userId,
    });
    const savedBlog = await blog.save();

    console.log(savedBlog._id);

    const suser = await User.findById(userId);
    suser.Blogs.push(savedBlog._id);
    await suser.save();
    res.status(201).json({ message: "Blog created" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/Blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({});

    res
      .status(200)
      .json({ message: "Blogs fetched successfully", blogs: blogs });
  } catch (error) {
    res.send(404).json({ message: "Error in fetching Blogs" });
    console.log(error);
  }
});

app.get("/profile", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId)
      .select("-password")
      .populate("Blogs");
    res
      .status(200)
      .json({ message: "Profile Fetched successfully", profile: user });
  } catch (error) {
    res.status(404).json({ Message: "Error in fetching" });
  }
});

app.listen(PORT, () => {
  console.log("Server started");
});
