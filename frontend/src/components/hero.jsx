import React from "react";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <div className="flex items-center justify-around flex-col-reverse sm:flex-row sm:m-3 md:m-5 lg:m-0">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl sm:text-xl md:text-2xl lg:text-4xl text-center mb-2">
          QuickConnect — <span className="text-gray-700"> A Real-Time</span>
          <h2 className="text-gray-700"> Chat Application</h2>
        </h1>
        <p className="p-1 font-semibold text-center text-md lg:text-lg sm:w-72 md:w-[450px] lg:w-[600px]">
          Built with performance and simplicity in mind, QUICK Connect offers a
          clean interface, real-time message delivery, and user-friendly
          navigation. Select a contact, type your message, and stay connected
          without distractions.{" "}
          <span className="hidden md:inline">
            Your conversations remain private, secure, and accessible anytime.
          </span>
        </p>

        <div className="flex gap-2 mt-2">
          <Link
            to="/signup"
            className="btn text-md text-white bg-gray-700 hover:btn-accent font-bold"
          >
            Get Started – Start Chatting
          </Link>
        </div>
      </div>
      <div>
        <img src="/hero.png" className="w-96 md:w-[400px] lg:w-[600px]" alt="chat_img"/>
      </div>
    </div>
  );
}

export default Hero;
