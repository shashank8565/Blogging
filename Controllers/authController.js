const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

exports.signup = async (req, res) => {
  const { email, username, password, preferredTags } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      preferredTags,
    });
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) throw new Error("Username not found");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Incorrect password");

    const token = jwt.sign({ _id: user._id }, "shashank09922", {
      expiresIn: "10d",
    });
    res.cookie("token", token);
    res.status(200).json({ message: "Logged in successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
