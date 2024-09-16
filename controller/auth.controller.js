import { User } from "../model/user.model.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ success: true, message: "All fields are required" });
  }
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const createUser = await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      createUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Username or Password not found" });
    }
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password) {
      return res
        .status(404)
        .json({ success: false, message: "Username or Password not found" });
    }
    const { password, ...others } = user._doc;
    const accessToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "1d" }
    );
    res
      .status(200)
      .json({
        success: true,
        accessToken: accessToken,
        message: "Login successful",
        ...others,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
