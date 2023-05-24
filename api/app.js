import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import fosterCenterRoutes from "./routes/fosterCenterRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import bookingFosterCenterRoutes from "./routes/bookingFosterRoutes.js";
import ProductRoutes from "./routes/productRoutes.js";
import AdoptionRoutes from "./routes/adoptionRoutes.js";
import VetDoctorRoutes from "./routes/vetDoctorRoutes.js";
import VetPharmacyRoutes from "./routes/vetPharmacyRoutes.js";
import ChatRoutes from "./routes/chatRoutes.js";
import MessageRoutes from "./routes/messageRoutes.js";
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// middlewares
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/fostercenters", fosterCenterRoutes);
app.use("/api/bookings", bookingFosterCenterRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/adoptions", AdoptionRoutes);
app.use("/api/vetdoctors", VetDoctorRoutes);
app.use("/api/vetpharmacy", VetPharmacyRoutes);
// app.use("/api/chats", ChatRoutes);
// app.use("/api/messages", MessageRoutes);
connectDB();
const port = 5000;

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with id ${socket.id} joined room ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_msg", data);
  });

  socket.on("disconnect", (data) => {
    console.log(`user disconnected: ${socket.id}`);
  });
});
server.listen(port, () => {
  console.log(`server runnung on port ${port}`.inverse);
});
