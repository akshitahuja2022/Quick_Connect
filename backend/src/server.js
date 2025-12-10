import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
dotenv.config();
connectDb();

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

app.get("/", (req, res) => {
  res.send("Welcome to QuickConnect Server");
});

app.listen(process.env.PORT, (req, res) => {
  console.log("Server is running on http://localhost:4000");
});
