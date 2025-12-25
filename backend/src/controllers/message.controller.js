import cloudinary from "../lib/cloudinary.js";
import MessageModel from "../models/message.js";
import UserModel from "../models/user.js";

const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await UserModel.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getAllContacts:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

// fetch that chats we send as sender/as receriver
const getChatsPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // find all the messages where the logged in user is either sender or receiver
    const messages = await MessageModel.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    // find chats in this chat if senderId === loggedInUser then give me receiverId / senderId
    const chatPartnersIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatPartners = await UserModel.find({
      _id: { $in: chatPartnersIds },
    }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    console.error("Error in getChatPartners", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user.id;
    const { id } = req.params;

    const messages = await MessageModel.find({
      $or: [
        { senderId: myId, receiverId: id },
        { senderId: id, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller:", error.message);
    res.status(500).json({ message: "Interal Server Error", success: false });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;
    if (!text && !req.file) {
      return res.status(400).json({ message: "Text or image is required." });
    }

    if (senderId === receiverId) {
      return res
        .status(400)
        .json({ message: "Cannot send message to yourself" });
    }

    const receiverExists = await UserModel.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    let imageUrl = null;

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "chat_images",
            resource_type: "auto",
          },
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    const newMessage = await MessageModel.create({
      senderId,
      receiverId,
      text: text || "",
      image: imageUrl,
    });

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller:", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export { getAllContacts, getChatsPartners, getMessagesByUserId, sendMessage };
