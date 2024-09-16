import { Router } from "express";
import { User } from "../model/user.model.js";
import { loginUser, registerUser } from "../controller/auth.controller.js";

const authRouter = Router();

//Register a user
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

export default authRouter;
