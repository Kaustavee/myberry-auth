import mongoose from "npm:mongoose";
import { ENVIRONMENT } from "./config.ts";

let connection: typeof mongoose | null = null;

function getMongodbURL() {
  const MONGODB_URL = Deno.env.get("MONGODB_URL");
  if (!MONGODB_URL || MONGODB_URL.trim().length === 0) {
    throw new Error("MONGODB_URI is not defined");
  }
  return MONGODB_URL;
}

export const dbConnect = async () => {
  if (ENVIRONMENT === "development") {
    if (connection === null) {
      connection = await mongoose.connect(getMongodbURL());
    }

    return connection;
  }

  return await mongoose.connect(getMongodbURL());
};
