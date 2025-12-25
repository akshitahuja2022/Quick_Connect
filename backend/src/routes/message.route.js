import express from "express";
import {
  getAllContacts,
  getChatsPartners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtecton } from "../middleware/arcjet.middleware.js";
import upload from "../middleware/multer.js";

const messageRouter = express.Router();

messageRouter.get("/contacts", arcjetProtecton, protectRoute, getAllContacts);
messageRouter.get("/chats", arcjetProtecton, protectRoute, getChatsPartners);
messageRouter.get("/:id", arcjetProtecton, protectRoute, getMessagesByUserId);
messageRouter.post(
  "/send/:id",
  upload.single("img"),
  arcjetProtecton,
  protectRoute,
  sendMessage
);

export default messageRouter;
