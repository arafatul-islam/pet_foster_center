import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
  {
    chatID: { type: String },
    senderID: { type: String },
    text: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("message", MessageSchema);
