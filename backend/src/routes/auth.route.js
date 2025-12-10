import express from "express";
import multer from "multer";
import {
  loginValidation,
  protectRoute,
  signupValidation,
} from "../middleware/auth.middleware.js";
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { arcjetProtecton } from "../middleware/arcjet.middleware.js";

const authRouter = express.Router();

authRouter.use(arcjetProtecton);

const upload = multer({ dest: "uploads/" });

authRouter.post("/signup", signupValidation, signup);
authRouter.post("/login", loginValidation, login);
authRouter.post("/logout", logout);

authRouter.put(
  "/update-profile",
  protectRoute,
  upload.single("profilePic"),
  updateProfile
);

// check user is authenticate or not
authRouter.get("/check", protectRoute, (req, res) =>
  res.status(200).json(req.user)
);
export default authRouter;
