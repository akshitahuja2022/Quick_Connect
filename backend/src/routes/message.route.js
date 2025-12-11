import express from "express";
import {
  getAllContacts,
  getChatsPartners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtecton } from "../middleware/arcjet.middleware.js";

const messageRouter = express.Router();

messageRouter.use(arcjetProtecton, protectRoute);

messageRouter.get("/contacts", getAllContacts);
messageRouter.get("/chats", getChatsPartners);
messageRouter.get("/:id", getMessagesByUserId);
messageRouter.post("/send/:id", sendMessage);

export default messageRouter;
