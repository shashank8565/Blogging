const express = require("express");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/DB");
require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/authRoute");
const blogRoutes = require("./routes/blogRoute");
const userRoutes = require("./routes/userRoute");

const corsOptions = {
  origin: "http://localhost:5173", // Allow only requests from this origin
  methods: "GET,POST", // Allow only these methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow only these headers
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api", blogRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
