import User from "../models/user.model.js";

// Update User
export const update = async (req, res) => {
  if (req.params.id === req.user.id) { 
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true } 
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
};

// Subscribe to a channel
export const subscribe = async (req, res) => {
  try {
    
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successful.");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add video to Watch History
export const addToHistory = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { watchHistory: req.params.videoId },
    });
    res.status(200).json("Added to watch history.");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get User's Watch History
export const getHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("watchHistory");
    res.status(200).json(user.watchHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};