import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cloudinary from "../lib/cloudinary.js";

dotenv.config();

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
      return res.status(409).json({
        message: "User already exist with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const jwtToken = jwt.sign(
      {
        _id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("usertoken", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "SignUp Successfully",
      success: true,
      user: {
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid Crendentials",
        success: false,
      });
    }

    const ispassword = await bcrypt.compare(password, user.password);
    if (!ispassword) {
      return res.status(401).json({
        message: "Invalid Credentials",
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      {
        _id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("usertoken", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Successfully",
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("usertoken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const filepath = req.file.path;
    if (!filepath) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(filepath);

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "User Profile Updated",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
export { signup, login, logout, updateProfile };
