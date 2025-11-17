import mongoose from "mongoose";
import { MONGO_STRING, NODE_ENV, PORT } from "./env.js";

export async function connectMongoDB() {
  try {
    await mongoose.connect(MONGO_STRING);
    console.log(
      `✅ MongoDB connected successfully (${NODE_ENV} mode). Server running on port ${PORT}`
    );
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // stop the app if DB fails to connect
  }
}
