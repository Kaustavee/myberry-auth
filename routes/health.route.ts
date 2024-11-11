import { Hono } from "@hono/hono";

import { checkConnetion } from "../lib/db.ts";

const healthRoute = new Hono();
healthRoute.get("/", async (c) => {
  type Status = "OK" | "ERROR";
  const live: Status = "OK";
  const ready: Status = (await checkConnetion()) ? "OK" : "ERROR";
  return c.json({ live, ready });
});
export default healthRoute;
