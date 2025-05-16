const express = require("express");
const router = express.Router();
const { createBlog, getBlogsByTags } = require("../Controllers/BlogController");
const userAuth = require("../middlewares/Auth");

router.post("/create", userAuth, createBlog);
router.get("/blogs", userAuth, getBlogsByTags);

module.exports = router;
