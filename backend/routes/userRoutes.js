import express from "express";
import { update, subscribe, addToHistory, getHistory } from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Update user profile
router.put("/:id", verifyToken, update);
// Subscribe to a channel
router.put("/sub/:id", verifyToken, subscribe); 
// Watch History routes
router.post("/history/:videoId", verifyToken, addToHistory);
router.get("/history", verifyToken, getHistory);

export default router;