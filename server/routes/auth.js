import express from "express";
import { signup, signin, getUser, logout } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { changePassword, updateUser } from "../controllers/updateProfile.js";

const router = express.Router();

router.use(express.json());
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/user", protect, getUser);
router.put("/userupdate", protect, updateUser);
router.put("/user/password", protect, changePassword);
router.post("/logout", logout);

export default router;