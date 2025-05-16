const User = require("../Models/userModel");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password")
      .populate("Blogs");
    res.status(200).json({ message: "Profile fetched", profile: user });
  } catch (error) {
    res.status(404).json({ message: "Error fetching profile" });
  }
};
