import mongoose from "mongoose";

const bookingFCSchema = mongoose.Schema(
  {
    fosterCenter: {
      type: String,
    },
    fosterCenterID: {
      type: String,
    },
    userID: {
      type: String,
    },
    fromDate: {
      type: String,
    },
    toDate: {
      type: String,
    },
    totalAmount: {
      type: String,
    },
    totalDays: {
      type: String,
    },
    transactionID: {
      type: String,
    },
    status: {
      type: String,
      default: "booked",
    },
  },
  { timestamps: true }
);

export default mongoose.model("bookingFosterCenter", bookingFCSchema);
