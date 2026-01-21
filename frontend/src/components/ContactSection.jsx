import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";

const ContactSection = ({ onSelectUser }) => {
  const [contacts, setContacts] = useState([]);

  const { onlineUsers } = useAuthContext();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/messages/contacts`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        const data = await res.json();
        setContacts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchContacts();
  }, []);

  const updatedContacts = contacts.map((contact) => ({
    ...contact,
    isOnline: onlineUsers.includes(contact._id),
  }));

  return (
    <>
      {updatedContacts.map((contact) => (
        <div
          key={contact._id}
          onClick={() => onSelectUser(contact)}
          className="flex gap-2 bg-gray-700 mx-auto w-full xs:w-88 sm:w-full rounded-lg h-20 p-2 px-5 cursor-pointer"
        >
          <div>
            <img
              src={contact.profilePic || "/avatar.png"}
              className="w-16 h-16 border rounded-full"
              alt="userProfile"
            />
          </div>

          <div className="m-3 text-white font-bold text-lg xs:text-xl sm:text-lg md:text-xl flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                contact.isOnline ? "bg-green-500" : "bg-red-300"
              }`}
            />
            <h2>{contact.name}</h2>
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactSection;
