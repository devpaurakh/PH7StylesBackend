import { Product } from "../model/product.model.js";

export const addProduct = async (req, res) => {
  const newProdcut = new Product(req.body);

  try {
    const saveProduct = await newProdcut.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Product added Successfully",
        saveProduct,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
