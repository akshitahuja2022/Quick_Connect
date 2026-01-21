import React, { useEffect, useState } from "react";
import { IoSettings } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";
import ChatSection from "../components/ChatSection";
import ContactSection from "../components/ContactSection";
import Conversation from "../components/ConversationPage";
import { useAuthContext } from "../context/authContext";
import { handleError, handleSuccess } from "../NotifyToast/Notify";
import socket from "../socket/socket";

const ChatPage = () => {
  const navigate = useNavigate();
  const [isMenu, setIsMenu] = useState(false);
  const [isActive, setIsActive] = useState("contact");
  const { user, setIsLogin, profilePic, setProfilePic } = useAuthContext();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket Disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      const data = await response.json();
      if (data.success) {
        socket.disconnect();
        handleSuccess(data.message || "Logged out successfully");
        setProfilePic(null);
        setIsLogin(false);
        navigate("/");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleUploadProfile = async (file) => {
    if (!file) return file;
    handleSuccess("Wait a sec... uploading profile");
    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/update-profile`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        },
      );
      const data = await response.json();

      if (data.success) {
        handleSuccess("Profile Updated Successfully");
        setProfilePic(data.user.profilePic);
      } else {
        handleError(data.message || "Upload failed");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      {/* Sidebar section */}
      <div
        className={`bg-gray-300 h-screen w-full sm:w-1/2 xl:w-1/4 shadow-lg flex flex-col
          ${selectedUser ? "hidden sm:flex" : "flex"}
          `}
      >
        <div className="flex items-center flex-row m-3 sm:m-2">
          <div className="flex items-center m-auto gap-5 sm:gap-2">
            <label htmlFor="profile" className="cursor-pointer">
              <img
                src={profilePic ? profilePic : "/avatar.png"}
                className="w-24 h-24 sm:w-20 sm:h-20 md:w-16 md:h-16 lg:w-24 lg:h-24 border sm:border-gray-200 rounded-full"
                alt="userProfile"
              />
            </label>
            <input
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                await handleUploadProfile(file);
              }}
              type="file"
              id="profile"
              className="hidden"
            />

            {user && (
              <div className="m-3 font-bold">
                <h2 className="text-xl xs:text-2xl sm:text-lg text-black mb-1">
                  {user.name}
                </h2>
                <p className="text-gray-900">{user.email}</p>
              </div>
            )}
          </div>

          <div
            onClick={() => setIsMenu(!isMenu)}
            className="hidden xs:block relative m-2 mt-7 sm:ml-14 cursor-pointer font-bold"
          >
            <IoSettings size={25} />

            {isMenu && (
              <div className="text-black hidden xs:flex flex-col gap-1 absolute top-6 right-5 bg-stone-400 w-40 h-24 rounded-md">
                <Link to="/" className="flex gap-2 m-2 px-2 font-bold">
                  <IoIosHome className="mt-1 text-lg" /> <span>Home</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex gap-2 px-2 m-2 font-bold"
                >
                  <IoLogOut className="mt-1 text-lg" /> <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Buttons  */}
        <div className="flex justify-center gap-3 sm:ml-2 sm:gap-5 md:gap-2">
          <button
            onClick={() => setIsActive("chat")}
            className={`btn hover:bg-stone-400 hover:text-black w-36 xs:w-44 sm:w-28 md:w-36 xl:w-40 sm:px-1 mt-3 border-none font-bold bg-gray-700 text-white  focus:bg-stone-400 focus:text-black`}
          >
            Chat Section
          </button>
          <button
            onClick={() => setIsActive("contact")}
            className={`btn hover:bg-stone-400 hover:text-black w-36 xs:w-44 sm:w-28 md:w-36 xl:w-40 sm:px-1 mt-3 border-none font-bold bg-gray-700 text-white  focus:bg-stone-400 focus:text-black`}
          >
            Contact Details
          </button>
        </div>
        {/* Chat Section and Contact Section */}
        <div className="flex-1 overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-thumb-gray-600">
          <div className="m-3 flex flex-col gap-3">
            {isActive === "chat" && (
              <ChatSection onSelectUser={handleSelectUser} />
            )}
            {isActive === "contact" && (
              <ContactSection onSelectUser={handleSelectUser} />
            )}
          </div>
        </div>
      </div>

      {/* Conversation section */}
      <div
        className={`
    w-full sm:w-1/2 md:w-3/4
    ${selectedUser ? "flex" : "hidden sm:flex"}
  `}
      >
        <Conversation
          onBack={() => setSelectedUser(null)}
          selectedUser={selectedUser}
        />
      </div>
    </div>
  );
};

export default ChatPage;
