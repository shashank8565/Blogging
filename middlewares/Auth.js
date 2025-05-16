const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
require("dotenv").config();

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const id = decoded._id;

    const user = await User.findById(id);

    if (!user) {
      throw new Error("user not found");
    }
    req.userId = user._id;
    next();
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
};

module.exports = userAuth;
