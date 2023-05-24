import express from "express";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import BookingFosterCenterModel from "../models/bookingFCSchema.js";
import fosterCenterModel from "../models/fosterCenterModel.js";

const router = express.Router();

const stripe = new Stripe(
  "sk_test_51MTRIPELpjaYtWLLDIEZcuYm9FZh97FHU7N7HvXF8bNJNLghoHNgPz3WKKGDMsjz8x64fS8imVPJnBd1RWvWgAow00OLY9BXNa"
);

router.post("/bookingfc", async (req, res) => {
  const {
    fosterCenter,
    userID,
    fromDate,
    toDate,
    totalDays,
    totalAmount,
    token,
  } = req.body;

  try {
    const newBooking = new BookingFosterCenterModel({
      fosterCenter: fosterCenter.name,
      fosterCenterID: fosterCenter._id,
      userID,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
      transactionID: Math.random().toString(36).substring(3),
    });

    const booking = newBooking.save();
    res.send("room booked successfully");
  } catch (error) {
    res.send("err");
  }
  // try {
  //   const customer = await stripe.customers.create({
  //     email: token.email,
  //     source: token.id,
  //   });

  //   const payment = await stripe.charges.create(
  //     {
  //       amount: totalAmount * 100,
  //       customer: customer.id,
  //       currency: "inr",
  //       receipt_email: token.email,
  //     },
  //     {
  //       idempotencyKey: uuidv4(),
  //     }
  //   );

  //   res.send("payment successfull");
  // } catch (error) {
  //   res.send("error");
  // }
});

router.post("/getbookingsbyuserid", async (req, res) => {
  const { userID } = req.body;

  try {
    const bookings = await BookingFosterCenterModel.find({ userID });
    res.json(bookings);
  } catch (error) {
    res.status(404).json("error");
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingID, fosterCenterID } = req.body;

  try {
    const booking = await BookingFosterCenterModel.findById(bookingID);
    booking.status = "cancelled";
    await booking.save();
    const fosterCenter = await fosterCenterModel.findById(fosterCenterID);
    const currentBookings = fosterCenter.currentBookings;
    const temp = currentBookings.filter(
      (booking) => booking.bookingID.toString() != bookingID
    );
    fosterCenter.currentBookings = temp;
    await fosterCenter.save();
    res.send("your booking cancelled successfully!");
  } catch (error) {
    res.status(403).send("error");
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const allBookings = await BookingFosterCenterModel.find();
    res.send(allBookings);
  } catch (error) {
    res.status(403).send(error);
  }
});

// product

export default router;
