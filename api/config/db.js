import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connect(process.env.MONGO);

  mongoose.connection.on("connected", () =>
    console.log("db connected".inverse.green)
  );

  mongoose.connection.on("error", () => console.log("db error".inverse.red));
};

export default connectDB;
