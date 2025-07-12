import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "../utility/logger";

dotenv.config();

const connectDB = async (): Promise<void> => {
  const MONGO_URI = process.env.DATABASE_URL || "";

  try {
    await mongoose.connect(MONGO_URI);

    logger.info("MongoDB connected successfully!");
  } catch (error) {
    logger.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export { connectDB, mongoose };
