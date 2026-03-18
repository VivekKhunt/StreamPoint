import Video from "../models/video.model.js";
import User from "../models/user.model.js";

// Upload video - PROTECTED
export const addVideo = async (req, res) => {
  const newVideo = new Video({ 
    UserId: req.user.id,
    ...req.body 
  });
  
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get random videos for the home page
export const randomVideos = async (req, res) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get trending videos based on views
export const trend = async (req, res) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search videos by title
export const search = async (req, res) => {
  const query = req.query.q; 
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" }, 
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search videos by tags
export const getByTag = async (req, res) => {
  const tags = req.query.tags.split(","); 
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Like a video
export const likeVideo = async (req, res) => {
  const id = req.user.id; 
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id }, 
      $pull: { dislikes: id },  
    });
    res.status(200).json({ message: "The video has been liked." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Dislike a video
export const dislikeVideo = async (req, res) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json({ message: "The video has been disliked." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add View Count
export const addView = async (req, res) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 }, 
    });
    res.status(200).json("The view has been increased.");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const sub = async (req, res) => {
  try {
    // 1. Find the current user to get their subscription list
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    // 2. Find all videos where the UserId is in the subscribedChannels list
    // We use $in to check if the Video's UserId matches ANY ID in our array
    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ UserId: channelId });
      })
    );

    // 3. Flatten the array and sort by newest first
    // .flat() is needed because Promise.all returns an array of arrays
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};