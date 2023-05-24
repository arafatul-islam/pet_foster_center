import express from "express";
import ProductModel from "../models/productModel.js";
import BuyProductModel from "../models/BuyProductModel.js";

const router = express.Router();

router.post("/addaproduct", async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);
    await newProduct.save();
    res.send("product added successfully.");
  } catch (error) {
    res.status(403).send("error while adding a product");
  }
});

router.get("/getallproducts", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.send(products);
  } catch (error) {
    res
      .status(403)
      .json({ message: "error occured while searching for products" });
  }
});

router.post("/getaproductbyid", async (req, res) => {
  try {
    const productID = req.body.productID;
    const product = await ProductModel.findById({
      _id: productID,
    });
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: "product is not found!" });
  }
});

router.post("/buyaproduct", async () => {
  const { productName, productID, userID, price } = req.body;

  try {
    const newBooking = new BuyProductModel({
      productName,
      productID,
      userID,
      price,
      transactionID: Math.random().toString(36).substring(3),
    });

    const booking = newBooking.save();
    res.send("product booked successfully");
  } catch (error) {
    res.send("err");
  }
});
export default router;
