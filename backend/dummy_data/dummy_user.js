import User from "./models/user.model.js";

const createTestUser = async () => {
  try {
    const user = await User.create({
      username: "vivek",
      email: "vivek@gmail.com",
      password: "123456",
    });

    console.log("Test User Created:", user);
  } catch (error) {
    console.log(error.message);
  }
};