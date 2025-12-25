import React, { useEffect, useState } from "react";
import { FiMessageCircle } from "react-icons/fi";

const ContactSection = ({ onSelectUser }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/messages/contacts`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        setContacts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <>
      {contacts.map((contact, index) => {
        return (
          <div
            key={index}
            onClick={() => onSelectUser(contact)}
            className="flex gap-2 bg-gray-700 rounded-lg h-20 p-2 px-3 cursor-pointer"
          >
            <div>
              <img
                src="/avatar.png"
                className="w-14 border rounded-full"
                alt="userProfile"
              />
            </div>
            <div className="m-3 text-white font-bold text-xl">
              <h2>{contact.name}</h2>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ContactSection;
