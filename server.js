import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); // to access the environment variables
const app = express(); // create an express application
app.use(express.json()); // for parsing application/json. this is a middleware function inbuilt in express to recognize the incoming Request Object as a JSON Object.
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";

app.use("/api/users", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`http://localhost:${process.env.PORT || 3000}`);
    });
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
