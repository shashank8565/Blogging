const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentBody: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
