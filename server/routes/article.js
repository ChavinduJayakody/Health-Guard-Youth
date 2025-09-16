import express from "express";
import { createArticle, getArticles, updateArticle, deleteArticle } from "../controllers/articleController.js"
import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.get("/", getArticles);
router.post("/", protectAdmin, createArticle);
router.patch("/:id", protectAdmin, updateArticle);
router.delete("/:id", protectAdmin, deleteArticle);

export default router;
