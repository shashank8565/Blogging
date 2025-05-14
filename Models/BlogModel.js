const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  blogbody: String,
  tags: [String],
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
