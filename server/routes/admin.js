import express from "express";
import {
  signupAdmin,
  loginAdmin,
  getAdminProfile,
  adminLogout,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getDashboardData } from "../controllers/adminController.js";

const router = express.Router();

router.post("/signup", signupAdmin);
router.post("/login", loginAdmin);
router.get("/profile", protect, getAdminProfile);
router.post("/logout", adminLogout);

router.get("/dashboard", protect, getDashboardData);

export default router;
