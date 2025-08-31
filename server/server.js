// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Example of a protected route
import { protect } from "./middleware/authMiddleware.js";
app.get("/api/profile", protect, (req, res) => {
  res.json({ message: `Hello user ${req.userId}` });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
