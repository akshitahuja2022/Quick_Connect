import { useState } from "react";
import { AuthContext } from "./authContext";

export const AuhtContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(false);
  const [user,setUser] = useState(null) 

  return (
    <AuthContext.Provider value={{ formData, setFormData, isLogin, setIsLogin, user,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
