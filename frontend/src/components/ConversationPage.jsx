import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaImage } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoArrowBack } from "react-icons/io5";

const Conversation = ({ selectedUser, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  useEffect(() => {
    if (!selectedUser) return;
    const fetchMessage = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/messages/${selectedUser._id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setMessages(data);
    };

    fetchMessage();
  }, [selectedUser]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !img) return;

    const formData = new FormData();
    formData.append("text", text);
    if (img) formData.append("img", img);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/messages/send/${
          selectedUser._id
        }`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      const data = await response.json();
      setMessages((prev) => [...prev, data]);
      setText("");
      setImg(null);
      document.getElementById("upload").value = null;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {selectedUser ? (
        <div className="w-full flex flex-col h-screen">
          {/* header part */}
          <div className="flex sm:justify-between gap-5 bg-gray-700 p-2 px-2 sm:px-4 cursor-pointer">
            <button onClick={onBack} className="text-gray-400 sm:hidden">
              <IoArrowBack size={24} />
            </button>
            <div className="flex gap-2">
              <img
                src={
                  selectedUser.profilePic
                    ? selectedUser.profilePic
                    : "/avatar.png"
                }
                className="w-14 h-14 border rounded-full"
                alt="userProfile"
              />
              {selectedUser && (
                <div className="m-2 text-white font-bold text-xl">
                  <h2>{selectedUser.name}</h2>
                </div>
              )}
            </div>
          </div>
          {/* Middle part */}
          <div className="flex-1 overflow-y-auto bg-gray-100 p-2 xs:p-4 space-y-3">
            {messages.map((msg) => {
              const isMe = msg.senderId !== selectedUser._id;

              return (
                <div
                  key={msg._id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm shadow-md
          ${
            isMe
              ? "bg-gray-700 text-white rounded-br-none"
              : "bg-gray-500 text-white rounded-bl-none"
          }`}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="sent"
                        className="w-40 rounded-md mb-2"
                      />
                    )}
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer part */}
          <div className="bg-gray-700 h-18 px-2 xs:px-4 lg:px-10 xl:px-14">
            <form
              encType="multipart/form-data"
              onSubmit={handleSendMessage}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              className="flex gap-2 xs:gap-3 py-5 justify-between"
            >
              <input
                type="text"
                value={img ? img.name : text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (img) {
                    setImg(null);
                  }
                }}
                className="flex-1 w-20 xs:w-full px-3 border-none outline-none font-bold h-10 rounded-md"
                placeholder="Type a message..."
              />

              <div className="flex gap-2 xs:gap-2">
                <input
                  accept="image/*"
                  onChange={(e) => {
                    setImg(e.target.files[0]);
                  }}
                  type="file"
                  id="upload"
                  className="hidden"
                />

                <label htmlFor="upload" className="cursor-pointer py-1">
                  <FaImage
                    size={20}
                    className="border h-9 w-9 p-2 bg-gray-400 rounded-md"
                  />
                </label>

                <button type="submit" className="cursor-pointer">
                  <BsFillSendFill
                    size={20}
                    className="border h-9 w-9 p-2 bg-gray-400 rounded-md cursor-pointer"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="text-black flex flex-col xl:mt-72 m-auto text-center">
          <LuMessageCircleMore size={40} className="m-auto mb-3" />
          <h2 className="font-bold text-xl">Select a conversation</h2>
          <p className="w-80 font-semibold m-auto text-center text-lg">
            Choose a contact from the sidebar to start chatting or continue a
            previous conversation
          </p>
        </div>
      )}
    </>
  );
};

export default Conversation;
