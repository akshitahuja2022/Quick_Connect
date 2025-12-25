import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { handleSuccess, handleError } from "../NotifyToast/Notify";

const SignUp = () => {
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

    if (!formData.name || !formData.email || !formData.password) {
      handleError("All fields are required");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );

      const { success, message, error, user } = await response.json();

      if (!response.ok) {
        handleError(message || "Signup failed");
        return;
      }
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        });
        setIsLogin(true);
        setUser(user);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!error) {
        handleError(message);
      }
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="flex items-center justify-around">
      <div className="m-auto md:m-20 mt-20">
        <div className="text-center font-bold">
          <h2 className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl">
            Create Account
          </h2>
          <p className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl">
            Sign up for a new account
          </p>
        </div>
        <div className="mt-10 lg:mt-5 ml-5">
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="flex flex-col gap-5"
          >
            <div>
              <label className="block font-bold" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-500 px-2 py-2 mt-1 rounded-md"
                placeholder="Enter your fullName"
              />
            </div>
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
              onClick={() => navigate("/login")}
              className="m-auto mt-1 bg-gray-300 px-2 py-1 cursor-pointer text-lg md:text-sm lg:text-lg md:py-2 lg:py-1 font-semibold rounded-md"
            >
              Already have an account? Login{" "}
            </div>
          </form>
        </div>
      </div>
      <div>
        <img
          src="/signup.png"
          className="hidden md:block md:w-full h-[600px] lg:w-full"
          alt="signup"
        />
      </div>
    </div>
  );
};

export default SignUp;
