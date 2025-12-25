import React from "react";
import { Link } from "react-router-dom";

const FeatureHighlight = () => {
  return (
    <div className="flex flex-col mt-10 lg:mt-5 lg:m-20 justify-center h-[100%] bg-stone-300 rounded-none sm:rounded-2xl overflow-x-hidden mb-10 md:mb-10">
      <div className="text-center flex flex-col gap-4 py-5 sm:py-5 lg:py-10">
        <h1 className="font-bold text-black text-xl sm:text-3xl">
          Start Meaningful Conversations Instantly
        </h1>
        <p className="font-bold text-md md:text-lg p-1 w-[100%] sm:w-[80%] lg:w-[50%] mx-auto text-black ">
          Provide real-time support and seamless communication through a fast,
          intuitive chat experience. Engage users instantly, resolve queries
          efficiently, and keep conversations flowing without delays—directly
          from your platform.
        </p>
        <Link
          to="/signup"
          className="btn text-white bg-gray-700 w-42 sm:w-52 text-md mx-auto hover:btn-accent font-bold"
        >
          Start a Conversation
        </Link>
      </div>
      <div className="m-auto mb-10">
        <img
          src="/preview.png"
          className="w-[90%] h-72 md:w-[100%] md:h-96 mx-auto rounded-lg shadow-xl"
          alt=""
        />
      </div>
    </div>
  );
};

export default FeatureHighlight;
