// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import cookieParser from "cookie-parser";
// import assessmentRoutes from "./routes/assessmentRoutes.js";

dotenv.config();

const app = express();
// app.use(cors());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes); 
// app.use("/api/assessments", assessmentRoutes);

// Example of a protected route
import { protect } from "./middleware/authMiddleware.js";
app.get("/api/profile", protect, (req, res) => {
  res.json({ message: `Hello user ${req.userId}` });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
