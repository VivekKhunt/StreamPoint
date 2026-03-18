import express from "express";
import { addVideo, randomVideos, trend, search, getByTag, likeVideo, dislikeVideo, addView, sub } from "../controllers/videoController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Public Routes
router.get("/random", randomVideos);
router.get("/trend", trend);
// Search routes
router.get("/search", search);
router.get("/tags", getByTag);
// Update view count
router.put("/view/:id", addView);

// Private/Protected Routes
router.post("/", verifyToken, addVideo);
// Like and Dislike routes
router.put("/like/:videoId", verifyToken, likeVideo);
router.put("/dislike/:videoId", verifyToken, dislikeVideo);
// Get subscribed channel videos
router.get("/sub", verifyToken, sub);

export default router;