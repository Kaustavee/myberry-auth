import { Hono } from "@hono/hono";
import { logger } from "@hono/hono/logger";
// import { validator } from "jsr:@hono/hono/validator";
// import mongoose, { Model, Schema } from "npm:mongoose";
import healthRoute from "./routes/health.route.ts";

// const userSchema = new Schema({
//   username: { type: String, required: true },
//   email: { type: String, unique: true },
//   password: { type: String, required: true },
// });
// interface IUser {
//   username: string;
//   email: string;
//   password: string;
// }
// const User: Model<IUser> = mongoose.models.User ||
//   mongoose.model("User", userSchema);

const app = new Hono();
app.use(logger());
app.route("/health", healthRoute);

// app.get("/health", (c) => {
//   try {
//     dbConnect();
//     return c.json({
//       live: "ok",
//       ready: "Ok",
//     });
//   } catch (error) {
//     return c.json({
//       live: "ok",
//       ready: "Error",
//     });
//   }
// });

// app.get("/", (c) => c.text("Hono!"));

// app.post(
//   "/login",
//   validator("form", (value, c) => {
//     const { email, password } = value;
//     if (
//       !email || typeof email !== "string" || !password ||
//       typeof password !== "string"
//     ) {
//       return c.text("missing login credentials!", 400);
//     }
//     return { email, password };
//   }),
//   async (c) => {
//     const { email, password } = c.req.valid("form");
//   },
// );
// app.post(
//   "/signup",
//   validator("form", (value, c) => {
//     const { username, email, password } = value;
//     if (
//       !email || typeof email !== "string" || !password ||
//       typeof password !== "string" || !username || typeof username !== "string"
//     ) {
//       return c.text("missing valid user credentials", 400);
//     }
//     return { username, email, password };
//   }),
//   (c) => {
//   },
// );

Deno.serve({ port: 3000 }, app.fetch);
