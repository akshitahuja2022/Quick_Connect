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
    <div className="flex flex-row items-center justify-center gap-52">
      <div>
        <div className="font-bold text-center">
          <h2 className="text-4xl">Create Account</h2>
          <p className="text-3xl py-2">Sign up for a new account</p>
        </div>
        <div className="mt-8">
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="flex flex-col gap-5"
          >
            <div>
              <label className="block text-lg font-bold" htmlFor="fullName">
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
              <label className="block text-lg font-bold" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-500 px-2 py-2 mt-1 rounded-md"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-lg font-bold" htmlFor="password">
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

            <div className="mt-1">
              <button className="w-full btn text-white bg-gray-700 hover:btn-accent font-bold">
                Submit
              </button>
            </div>

            <div
              onClick={() => navigate("/login")}
              className="m-auto mt-2 bg-gray-300 px-2 py-1 cursor-pointer text-lg font-semibold rounded-md"
            >
              Already have an account? Login{" "}
            </div>
          </form>
        </div>
      </div>
      <div>
        <img src="/signup.png" className="w-[100%] h-[630px]" alt="signup" />
      </div>
    </div>
  );
};

export default SignUp;
