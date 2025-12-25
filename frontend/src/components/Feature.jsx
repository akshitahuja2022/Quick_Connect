import React from "react";

const Feature = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-10">
      <div className="w-[300px] md:w-[400px] lg:w-[550px] h-[550px]">
        <div className="hidden md:flex m-2 h-[250px] rounded-xl shadow-lg">
          <img
            src="/feature2.png"
            className="w-full h-full rounded-lg"
            alt=""
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="m-2 md:py-3 lg:py-8 h-[250px] w-full rounded-2xl shadow-lg">
            <h1 className="text-center mt-5 text-gray-700 font-bold text-xl md:text-lg lg:text-xl">
              Real-Time Messaging
            </h1>
            <p className="font-semibold p-1 px-2 text-center">
              Experience instant message delivery with a smooth chat interface
              that keeps conversations without delays.
            </p>
          </div>
          <div className="m-2 md:py-3 lg:py-8 h-[250px] w-full rounded-2xl shadow-lg">
            <h1 className="text-center mt-5 text-gray-700 font-bold text-xl md:text-lg lg:text-xl">
              Media Sharing
            </h1>
            <p className="font-semibold p-1 px-2 text-center">
              Share images effortlessly within conversations with instant
              previews for a rich and interactive chat experience.
            </p>
          </div>
        </div>
      </div>
      <div className="w-[300px] md:w-[400px] lg:w-[550px] h-[550px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="m-2 md:py-3 lg:py-8 h-[250px] w-full rounded-2xl shadow-lg">
            <h1 className="text-center mt-5 text-gray-700 font-bold text-xl md:text-lg lg:text-xl">
              Fully Responsive Design
            </h1>
            <p className="font-semibold p-1 px-2 text-center">
              Enjoy a consistent and optimized chat experience across desktops,
              tablets, and mobile devices worldwide.
            </p>
          </div>
          <div className="m-2 md:py-3 lg:py-8 h-[250px] w-full rounded-2xl shadow-lg">
            <h1 className="text-center mt-5 text-gray-700 font-bold text-xl md:text-lg lg:text-xl">
              Secure Authentication
            </h1>
            <p className="font-semibold p-1 px-2 text-center">
              User accounts are protected with secure login and signup
              functionality, ensuring safe and private communication.
            </p>
          </div>
        </div>
        <div className="hidden md:flex m-2 h-[250px] rounded-xl shadow-lg">
          <img
            src="/feature1.png"
            className="w-full h-full rounded-lg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Feature;
