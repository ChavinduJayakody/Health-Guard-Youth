import express from "express";
import { signup, signin, getUser, logout } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(express.json());
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/user", protect, getUser);
router.post("/logout", logout);

export default router;