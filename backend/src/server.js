import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
dotenv.config();
connectDb();

const PORT = process.env.PORT || 4000;
app.set("trust proxy", true);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Vite default
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

app.get("/", (req, res) => {
  res.send("Welcome to QuickConnect Server");
});

server.listen(process.env.PORT, (req, res) => {
  console.log("Server is running on http://localhost:4000");
});
