import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      trim: true,
      maxLength: 200
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("connect-messages", messageSchema);
export default MessageModel;
