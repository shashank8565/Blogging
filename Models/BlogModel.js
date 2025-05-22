const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    body: String,
    tags: [String],
    comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
