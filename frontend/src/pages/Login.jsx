import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { handleError, handleSuccess } from "../NotifyToast/Notify";
import socket from "../socket/socket";

const Login = () => {
  const navigate = useNavigate();

  const { formData, setFormData, setIsLogin, setUser, setProfilePic } =
    useAuthContext();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          credentials: "include",
        },
      );

      const { success, message, error, user } = await response.json();

      if (success) {
        handleSuccess(message);
        setIsLogin(true);
        setUser(user);
        setProfilePic(user.profilePic || null);

        if (!socket.connected) {
          socket.connect();
        }
        setTimeout(() => {
          navigate("/chatPage");
        });
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!error) {
        handleError(error);
      }
      setFormData({ email: "", password: "" });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="flex items-center justify-around">
      <div className="m-auto md:m-20 mt-20">
        <div className="text-center font-bold">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl">Welcome Back</h2>
          <p className="text-2xl sm:text-3xl lg:text-3xl">
            Login to access your account
          </p>
        </div>
        <div className="mt-10 lg:mt-8 ml-2">
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="flex flex-col gap-5"
          >
            <div>
              <label className="block font-bold" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full sm:w-400 border border-gray-500 px-2 py-2 mt-1 rounded-md"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block font-bold" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-500 px-2 py-2 mt-1 rounded-md"
                placeholder="Enter your password"
              />
            </div>

            <div className="">
              <button className="w-full btn text-white bg-gray-700 hover:btn-accent font-bold">
                Submit
              </button>
            </div>

            <div
              onClick={() => navigate("/signup")}
              className="m-auto mt-1 bg-gray-300 px-2 py-1 cursor-pointer text-lg md:text-sm lg:text-lg md:py-2 lg:py-1 font-semibold rounded-md"
            >
              Already have an account? Signup{" "}
            </div>
          </form>
        </div>
      </div>
      <div>
        <img
          src="/login.png"
          className="hidden md:block md:w-full h-[600px] lg:w-full"
          alt="signup"
        />
      </div>
    </div>
  );
};

export default Login;
