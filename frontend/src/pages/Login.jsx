import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { handleError, handleSuccess } from "../NotifyToast/Notify";

const Login = () => {
  const navigate = useNavigate();

  const { formData, setFormData, setIsLogin, setUser } = useAuthContext();

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
        }
      );

      const { success, message, error, user } = await response.json();

      if (success) {
        handleSuccess(message);
        setIsLogin(true);
        setUser(user);
        setTimeout(() => {
          navigate("/");
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
    <div className="flex flex-row items-center justify-center gap-52">
      <div>
        <div className="font-bold text-center">
          <h2 className="text-4xl">Welcome Back</h2>
          <p className="text-3xl py-2">Login to access your account</p>
        </div>
        <div className="mt-10">
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="flex flex-col gap-5"
          >
            <div>
              <label className="block text-lg font-bold" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-500 px-2 py-2 mt-1 rounded-md"
                placeholder="Enter your email"
              />
            </div>
            <div className="mt-1">
              <label className="block text-lg font-bold" htmlFor="password">
                Password
              </label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-500 px-2 py-2 mt-1 rounded-md"
                placeholder="Enter your password"
              />
            </div>

            <div className="mt-2">
              <button className="w-full btn text-white bg-gray-700 hover:btn-accent font-bold">
                Submit
              </button>
            </div>

            <div
              onClick={() => navigate("/signup")}
              className="m-auto mt-2 bg-gray-300 px-2 py-1 cursor-pointer text-lg font-semibold rounded-md"
            >
              Don't have an account? Sign up{" "}
            </div>
          </form>
        </div>
      </div>
      <div>
        <img src="/login.png" className="w-[100%] h-[630px]" alt="login" />
      </div>
    </div>
  );
};

export default Login;
