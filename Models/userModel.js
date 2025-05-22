const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  prefferedTags: [String],
  Blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
