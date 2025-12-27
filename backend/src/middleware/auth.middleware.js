import Joi from "joi";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/user.js";
dotenv.config();

const signupValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(10).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Bad Requrst", error });
    }
    next();
  } catch (error) {
    res.status(404).json({ message: "Bad Requrst", error });
  }
};

const loginValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(10).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Bad Requrst", error });
    }
    next();
  } catch (error) {
    res.status(404).json({ message: "Bad Requrst", error });
  }
};

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.usertoken;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided", success: false });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invaild token", success: false });
    }

    const user = await UserModel.findById(decoded._id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not found", success: false });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export { signupValidation, loginValidation, protectRoute };
