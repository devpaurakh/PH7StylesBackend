import { User } from "../model/user.model.js";
import mongoose from "mongoose";
import CryptoJS from "crypto-js";

export const updateUser = async (req, res) => {
  // If password is provided, encrypt it before saving
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    // Update the user and return the new user data
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // This returns the updated document
    );

    const { password, ...others } = updatedUser._doc;

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Respond with the updated user data
    res.status(200).json({
      success: true,
      message: "User successfully updated.",
      ...others,
    });
  } catch (error) {
    // Handle any errors and send a 500 status code
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the user.",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid user ID" });
    return;
  }
  try {
    const deleteUser = await User.findByIdAndDelete(id);

    if (!deleteUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  try {
    const userById = await User.findById(id);
    const { password, ...others } = userById._doc;

    if (!userById) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      ...others,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllUser = async (req, res) => {
  const query = req.query.new;
  try {
    const user = query
      ? await User.find().sort({ _id: -1 }).limit(10)
      : await User.find({});
    res.json({
      success: true,
      messsage: "Data Fetched Successfully Fetched",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
