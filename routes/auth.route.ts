import { Hono } from "@hono/hono";
import { validator } from "@hono/hono/validator";
import { z } from "zod";
import logger from "../lib/logger.ts";
import { dbConnect } from "../lib/db.ts";
import User from "../models/user.model.ts";

const authRoute = new Hono();

const sigupValidator = validator("form", (value, c) => {
  const { username, email, password } = value;
  if (
    !email ||
    typeof email !== "string" ||
    !password ||
    typeof password !== "string" ||
    !username ||
    typeof username !== "string"
  ) {
    return c.text("missing valid user credentials", 400);
  }

  const parsed = z
    .object({
      username: z.string().min(3).max(20),
      email: z.string().email(),
      password: z
        .string()
        .min(8)
        .regex(/[0-9]/, "password must contain a number")
        .regex(/[a-z]/, "password must contain a lowercase letter")
        .regex(/[A-Z]/, "password must contain an uppercase letter")
        .regex(/[@\._]/, "password must contain a special character"),
    })
    .safeParse({ username, email, password });

  if (!parsed.success) {
    logger.error(JSON.stringify(parsed.error, null, 2));
    return c.text("invalid user credentials", 400);
  }

  return { username, email, password };
});

authRoute.post("/signup", sigupValidator, async (c) => {
  const { username, email, password } = c.req.valid("form");

  try {
    await dbConnect();

    // SELECT * FROM users WHERE email = email;
    const user = await User.findOne({ email });

    if (user) {
      return c.text("user already exists", 409);
    }

    const newUser = new User({ username, email, password });

    await newUser.save();

    return c.text(`${username} has been created`, 201);
  } catch (error) {
    logger.error("error in creating user", error);
    return c.text("error in creating user", 500);
  }
});

export default authRoute;
