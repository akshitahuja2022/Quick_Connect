import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL, {
  withCredentials: true,
  autoConnect: false,
});

socket.on("connect_error", (err) => {
  console.error("Socket error:", err.message);
});

export default socket;
