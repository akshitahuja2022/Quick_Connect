import React from "react";
import { Link } from "react-router-dom";

const FeatureHighlight = () => {
  return (
    <div className="flex justify-center h-lvh bg-stone-300 m-20 rounded-2xl overflow-x-hidden">
      <div className="text-center flex flex-col gap-5 py-10">
        <h1 className="font-bold text-black text-3xl">
          Start Meaningful Conversations Instantly
        </h1>
        <p className="font-bold text-xl w-[50%] mx-auto text-black ">
          Provide real-time support and seamless communication through a fast,
          intuitive chat experience. Engage users instantly, resolve queries
          efficiently, and keep conversations flowing without delays—directly
          from your platform.
        </p>
        <Link
          to="/signup"
          className="btn text-white bg-gray-700 w-52 text-md mx-auto hover:btn-accent font-bold"
        >
          Start a Conversation
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default FeatureHighlight;
