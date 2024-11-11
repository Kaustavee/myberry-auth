import mongoose from "npm:mongoose";
import logger from "./logger.ts";

export const dbConnect = async () => {
  const MONGODB_URI = Deno.env.get("MONGODB_URI");
  if (!MONGODB_URI || MONGODB_URI.trim().length == 0) {
    throw new Error("MONGODB_URI is not defined");
  }
  const client = await mongoose.connect(MONGODB_URI);
  logger.info("Connected to MongoDB");
  return client;
};
export const checkConnetion = async () => {
  try {
    await dbConnect();
    return true;
  } catch (error) {
    logger.error("failed to connect to mongodb:", error);
    return false;
  }
};
