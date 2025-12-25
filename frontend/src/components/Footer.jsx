import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-stone-300 text-black py-10 px-6 mt-5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-20">
        <div>
          <h2 className="text-2xl font-bold text-black">QuickConnect</h2>
          <p className="mt-2 text-sm">Connect Faster. Talk Smarter.</p>
        </div>

        <div>
          <h3 className="text-black mb-2 font-bold text-lg">About</h3>
          <p className="text-md  leading-6">
            QuickConnect is a seamless chat platform built for real-time
            messaging, secure authentication, and smooth communication across
            all devices.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-black mb-2 text-lg">Links</h3>
          <ul className="space-y-1 flex flex-col text-md">
            <NavLink to="/" className="hover:text-gray-800">
              Home
            </NavLink>
            <NavLink to="/login" className="hover:text-gray-800">
              Login
            </NavLink>
            <NavLink to="/signup" className="hover:text-gray-800">
              Signup
            </NavLink>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center mt-10 text-xl text-black border-t border-gray-700 pt-5">
        © 2025 QuickConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
