import { Router } from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../controller/jwtVerify.controller.js";
import {} from "../controller/user.controller.js";
import { addProduct } from "../controller/product.controller.js";

const productRouter = Router();

productRouter.post("/", verifyTokenAndAdmin, addProduct);

export default productRouter;
