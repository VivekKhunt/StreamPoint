import Comment from "../models/comment.model.js";

const createTestComment = async () => {
  try {
    const comment = await Comment.create({
        userId: "699d477850f26fb3ceaa6b9f",
        videoId: "699d477850f26fb3ceaa6b9f",
        desc: "Great video! Very informative and well explained."
    });
    console.log("Test Comment Created:", comment);
  } catch (error) {
    console.log(error.message);
  }
};

export default createTestComment;