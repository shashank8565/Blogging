const express = require("express");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/DB");
require("dotenv").config();

const authRoutes = require("./routes/authRoute");
const blogRoutes = require("./routes/blogRoute");
const userRoutes = require("./routes/userRoute");

const app = express();
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
