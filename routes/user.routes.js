import { Router } from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../controller/jwtVerify.controller.js";
import {
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "../controller/user.controller.js";

const userRouter = Router();

userRouter.get("/all", verifyTokenAndAdmin, getAllUser);

userRouter.put("/:id", verifyTokenAndAuthorization, updateUser);

userRouter.delete("/:id", verifyTokenAndAdmin, deleteUser);

userRouter.get("/:id", verifyTokenAndAdmin, getUserById);

export default userRouter;

