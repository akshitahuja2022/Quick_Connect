import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

const Navbar = () => {
  const [isMenu, setIsMenu] = useState(false);
  return (
    <>
      <div className="flex justify-between font-serif items-center text-black px-2 py-1">
        <Link to="/" className="font-bold text-2xl">
          Quick<span className="text-gray-700">Connect</span>
        </Link>
        <div className="hidden sm:flex gap-2 relative">
          <Link
            to="/login"
            className="btn text-lg bg-transparent border-none outline-none shadow-none font-bold text-black hover:btn-accent hover:outline-none"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="btn text-white bg-gray-700 hover:btn-accent font-bold"
          >
            Signup
          </Link>
        </div>

        <div
          onClick={() => setIsMenu(!isMenu)}
          className="block sm:hidden text-2xl text-gray-700 font-bold cursor-pointer mt-1"
        >
          <IoMenu className="font-bold" />
        </div>
      </div>

      <div className="text-black">
        {isMenu && (
          <div className="font-serif flex flex-col gap-1 items-center text-md absolute top-10 right-5 bg-gray-400 w-24 h-24 rounded-md">
            <Link
              to="/login"
              className="px-2 m-3 bg-transparent shadow-none font-bold text-black"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-2 font-bold"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
