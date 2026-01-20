import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});
// apply authenticate middleware for all socket connections
io.use(socketAuthMiddleware);

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.user.fullName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // it is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A User disconnected", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export {io, app,server}