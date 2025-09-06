import express from "express";
import { predictBoth } from "../controllers/predictController.js";
import { protect } from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/both", predictBoth);

export default router;
