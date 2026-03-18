import Video from "../models/video.model.js";

const createTestVideo = async () => {
  try {
    const video = await Video.create({
      "UserId": "699d477850f26fb3ceaa6b9f",
      "title": "Introduction to MongoDB",
      "description": "This video explains the basics of MongoDB, including collections, documents, and CRUD operations.",
      "videoUrl": "https://example.com/videos/mongodb-intro.mp4",
      "thumbnailUrl": "https://example.com/thumbnails/mongodb-intro.jpg",
      "views": 1250,
      "tags": ["mongodb", "database", "backend", "nosql"],
      "likes": [
        "699d477850f26fb3ceaa6b9f",
      ],
      "dislikes": [
        "699d479127535bd50dba1e53"
      ]
    });

    console.log("Test Video Created:", video);
  } catch (error) {
    console.log(error.message);
  }
};

export default createTestVideo;