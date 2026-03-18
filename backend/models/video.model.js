import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [2000, "Description too long"],
    },

    videoUrl: {
      type: String,
      required: [true, "Video URL is required"],
    },

    thumbnailUrl: {
      type: String,
      required: [true, "Thumbnail URL is required"],
    },

    views: {
      type: Number,
      default: 0,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;