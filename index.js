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

app.post("/addPost", async (req, res) => {
  const { title, description, blogBody, tags } = req.body;
  try {
    const blog = new Blog({
      title,
      description,
      blogBody,
      tags, // this must be an array
    });

    await blog.save();

    console.log("Document Saved Successfully");
    res.status(201).json({ Message: "BlogAdded" });
  } catch (error) {
    console.log("error", error);
  }
});

app.listen(PORT, () => {
  console.log("Server started");
});
