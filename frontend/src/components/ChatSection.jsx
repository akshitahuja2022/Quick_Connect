import React, { useEffect, useState } from "react";
import { FiMessageCircle } from "react-icons/fi";

const ChatSection = ({ onSelectUser }) => {
  const [chatspartners, setChatsPartners] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/messages/chats`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        setChatsPartners(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <>
      {chatspartners.length > 0 ? (
        chatspartners.map((partner) => (
          <div
            key={partner._id}
            onClick={() => onSelectUser(partner)}
            className="flex gap-2 bg-gray-700 rounded-lg h-20 p-2 px-3 cursor-pointer"
          >
            <img
              src="/avatar.png"
              className="w-14 h-14 border rounded-full"
              alt="userProfile"
            />
            <div className="m-3 text-white font-bold text-xl">
              <h2>{partner.name}</h2>
            </div>
          </div>
        ))
      ) : (
        <div className="text-black mt-40 m-auto text-center">
          <FiMessageCircle size={40} className="m-auto mb-3" />
          <h2 className="font-bold text-xl">No conversations yet</h2>
          <p className="w-64 font-semibold text-center text-lg m-auto">
            Start a new chat by selecting a contact from the contact hub
          </p>
        </div>
      )}
    </>
  );
};

export default ChatSection;
