import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaImage } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { LuMessageCircleMore } from "react-icons/lu";

const Conversation = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

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
    if (!text.trim()) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/messages/send/${
          selectedUser._id
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
          credentials: "include",
        }
      );
      const data = await response.json();
      setMessages((prev) => [...prev, data]);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {selectedUser ? (
        <div className="flex flex-col h-screen">
          {/* header part */}
          <div className="flex justify-between gap-2 bg-gray-700 p-2 px-4 cursor-pointer">
            <div className="flex gap-2">
              <img
                src="/avatar.png"
                className="w-12 border rounded-full"
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
          <div className="flex-1 overflow-y-auto bg-gray-100 p-4 space-y-3">
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
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer part */}
          <div className="bg-gray-700 h-20 px-10">
            <form
              onSubmit={handleSendMessage}
              className="flex gap-10 py-5 justify-between"
            >
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 px-3 border-none outline-none font-bold h-10 rounded-md"
                placeholder="Type a message..."
              />

              <div className="flex gap-5">
                <button type="button" className="cursor-pointer">
                  <FaImage
                    size={20}
                    className="border h-9 w-9 p-2 bg-gray-400 rounded-md cursor-pointer"
                  />
                </button>
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
        <div className="text-black flex flex-col mt-72 m-auto text-center">
          <LuMessageCircleMore size={40} className="m-auto mb-3" />
          <h2 className="font-bold text-xl">Select a conversation</h2>
          <p className="w-96 font-semibold m-auto text-center text-lg">
            Choose a contact from the sidebar to start chatting or continue a
            previous conversation
          </p>
        </div>
      )}
    </>
  );
};

export default Conversation;
