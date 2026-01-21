import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { useAuthContext } from "../context/authContext";
import { handleError, handleSuccess } from "../NotifyToast/Notify";
import socket from "../socket/socket";
const Navbar = () => {
  const navigate = useNavigate();
  const [isMenu, setIsMenu] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const { isLogin, setIsLogin, user } = useAuthContext();

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
        setIsLogin(false);
        setIsProfile(false);
        setIsMenu(false);

        navigate("/");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <div className="flex justify-between font-serif items-center text-black px-2 py-1">
        <Link to="/" className="font-bold text-2xl">
          Quick<span className="text-gray-700">Connect</span>
        </Link>
        <div className="hidden sm:flex gap-2 relative">
          {isLogin ? (
            <button
              onClick={() => setIsProfile(!isProfile)}
              className="btn text-white bg-gray-700 hover:btn-accent font-bold"
            >
              Profile
            </button>
          ) : (
            <>
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
            </>
          )}
        </div>

        <div
          onClick={() => {
            setIsMenu(!isMenu);
            setIsProfile(false);
          }}
          className="block sm:hidden text-2xl text-gray-700 font-bold cursor-pointer mt-1"
        >
          <IoMenu className="font-bold" />
        </div>
      </div>

      {isMenu && (
        <div className="sm:hidden absolute top-12 right-4 bg-stone-300 w-28 rounded-md flex flex-col items-center py-2 font-serif">
          {isLogin ? (
            <button
              onClick={() => {
                setIsProfile(!isProfile);
                setIsMenu(false);
              }}
              className="font-bold text-black"
            >
              Profile
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="font-bold my-1"
                onClick={() => setIsMenu(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="font-bold my-1"
                onClick={() => setIsMenu(false)}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}

      <div className="flex">
        {isProfile && (
          <div className="font-serif flex flex-col gap-1 items-center absolute top-25 right-16 py-2 bg-stone-300 w-52 h-34 rounded-md">
            <div>
              <h2 className="font-bold text-lg">{user.name}</h2>
              <p className="font-bold ">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-2 mt-2 py-1 bg-gray-700 text-white rounded-lg font-bold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
