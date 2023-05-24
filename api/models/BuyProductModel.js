import mongoose from "mongoose";

const BuyProductSchema = mongoose.Schema(
  {
    productName: {
      type: String,
    },
    productID: {
      type: String,
    },
    userID: {
      type: String,
    },
    price: {
      type: String,
    },
    transactionID: {
      type: String,
    },
    status: {
      type: String,
      default: "delivered",
    },
  },
  { timestamps: true }
);

export default mongoose.model("buy_product", BuyProductSchema);
