import express from "express";
import { addComment, deleteComment, getComments } from "../controllers/commentController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Public Routes
router.get("/:videoId", getComments);

// Private/Protected Routes
router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);

export default router;