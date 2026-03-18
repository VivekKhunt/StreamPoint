import Comment from "../models/comment.model.js";
import Video from "../models/video.model.js";

// Add a comment
export const addComment = async (req, res) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    
    // Only the owner of the comment or the owner of the video can delete it
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted.");
    } else {
      return res.status(403).json("You can delete only your comment!");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all comments for a specific video
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};