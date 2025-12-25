import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ChatPage from "./pages/ChatPage";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./context/authContext";
import Home from "./pages/Home";

const App = () => {
  const { isLogin } = useAuthContext();
  const location = useLocation();

  const hideNavbar = location.pathname === "/chatPage";
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/chatPage"
          element={isLogin ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isLogin ? <Navigate to="/chatPage" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLogin ? <Navigate to="/chatPage" /> : <SignUp />}
        />

        <Route
          path="*"
          element={<Navigate to={isLogin ? "/chatPage" : "/login"} />}
        />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
