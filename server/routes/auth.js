import express from "express";
import { signup, signin, getUser, logout } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { changePassword, updateUser } from "../controllers/updateProfile.js";
import { deleteAccount } from "../controllers/deleteAccount.js";
const router = express.Router();

router.use(express.json());
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/user", protect, getUser);
router.put("/userupdate", protect, updateUser);
router.put("/user/password", protect, changePassword);
router.delete("/user/delete", protect, deleteAccount);
router.post("/logout", logout);

export default router;