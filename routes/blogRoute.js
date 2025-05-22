const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlogsByTags,
  getBlogById,
} = require("../Controllers/BlogController");
const userAuth = require("../middlewares/Auth");

router.post("/create", userAuth, createBlog);
router.get("/blogs", userAuth, getBlogsByTags);
router.get("/blog/:id", userAuth, getBlogById);

module.exports = router;
