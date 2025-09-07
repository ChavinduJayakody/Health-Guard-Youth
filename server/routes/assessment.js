import express from "express";
import { createAssessment, getUserAssessments, getAssessmentById } from "../controllers/assessmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createAssessment);
router.get("/user/:userId", protect, getUserAssessments);
router.get("/:id", protect, getAssessmentById);

export default router;