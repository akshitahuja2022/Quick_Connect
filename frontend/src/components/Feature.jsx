import React from "react";

const Feature = () => {
  return (
    <div className="flex gap-4 justify-center">
      <div className="box1 w-[550px] h-[550px]">
        <div className="m-2 border border-gray-400 h-[250px] rounded-xl bg-gray-800 shadow-lg">
          <img src="/feature2.png" className="w-full h-full rounded-lg" alt="" />
        </div>

        <div className="flex flex-row">
          <div className="m-2 py-8 h-[250px] w-full rounded-2xl shadow-lg">
            <h1 className="text-center text-gray-700 font-bold text-xl">
              Real-Time Messaging
            </h1>
            <p className="font-semibold p-1 px-2 text-center">
              Experience instant message delivery with a smooth chat
              interface that keeps conversations without delays.
            </p>
          </div>
          <div className="m-2 py-8 h-[250px] w-full rounded-2xl shadow-lg">
            <h1 className="text-center text-gray-700 font-bold text-xl">
              Media Sharing
            </h1>
            <p className="font-semibold p-1 px-2 text-center">
              Share images effortlessly within conversations with instant
              previews for a rich and interactive chat experience.
            </p>
          </div>
        </div>
      </div>
      <div className="box1 w-[550px] h-[550px]">
        <div className="flex flex-row">
          <div className="m-2 py-8 h-[250px] w-full rounded-2xl shadow-lg">
            <h1 className="text-center mt-5 text-gray-700 font-bold text-xl">
              Fully Responsive Design
            </h1>
            <p className="font-semibold p-1 px-2 text-center">
              Enjoy a consistent and optimized chat experience across desktops,
              tablets, and mobile devices worldwide.
            </p>
          </div>
          <div className="m-2 py-8 h-[250px] w-full rounded-2xl shadow-lg">
            <h1 className="text-center mt-5 text-gray-700 font-bold text-xl">
              Secure Authentication
            </h1>
            <p className="font-semibold p-1 px-2 text-center">
              User accounts are protected with secure login and signup
              functionality, ensuring safe and private communication.
            </p>
          </div>
        </div>
        <div className="m-2 h-[250px] rounded-xl bg-gray-800 shadow-lg">
          <img src="/feature1.png" className="w-full h-full rounded-lg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Feature;
