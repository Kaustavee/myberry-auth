import { Hono } from "@hono/hono";
import { dbConnect } from "../lib/db.ts";
import logger from "../lib/logger.ts";

const healthRoute = new Hono();

healthRoute.get("/", async (c) => {
  type Status = "OK" | "ERROR";
  const live: Status = "OK";
  let ready: Status;

  try {
    await dbConnect();
    ready = "OK";
  } catch (error) {
    logger.error("error in connecting to mongodb", error);
    ready = "ERROR";
  }

  return c.json({ live, ready });
});

export default healthRoute;
