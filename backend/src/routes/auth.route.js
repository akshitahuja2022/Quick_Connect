import express from "express";
import {
  loginValidation,
  signupValidation,
} from "../middleware/auth.middleware.js";
import { login, logout, signup } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signupValidation, signup);
authRouter.post("/login", loginValidation, login);
authRouter.get("/logout", logout);

export default authRouter;
