const express = require("express");
const router = express.Router();
const { getProfile } = require("../Controllers/userController");
const userAuth = require("../middlewares/Auth");

router.get("/profile", userAuth, getProfile);

module.exports = router;
