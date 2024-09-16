import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
    },
    image: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
