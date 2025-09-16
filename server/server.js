import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import cookieParser from "cookie-parser";
import predictRoutes from "./routes/predictRoutes.js";
import assessmentRoutes from "./routes/assessment.js";
import articleRoutes from "./routes/article.js";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes); 
app.use("/api/predict", predictRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/articles", articleRoutes);

// test
import { protect } from "./middleware/authMiddleware.js";
app.get("/api/profile", protect, (req, res) => {
  res.json({ message: `User ID: ${req.userId}` });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
