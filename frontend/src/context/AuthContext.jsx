import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { handleError } from "../NotifyToast/Notify";

export const AuhtContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/check`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Not authenticated");

        const userData = await res.json();

        setIsLogin(true);
        setUser(userData);
        setProfilePic(userData.profilePic || null);
      } catch (error) {
        handleError(error);
        setIsLogin(false);
        setUser(null);
        setProfilePic(null);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        formData,
        setFormData,
        isLogin,
        setIsLogin,
        user,
        setUser,
        profilePic,
        setProfilePic,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
