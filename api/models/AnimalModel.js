import mongoose from "mongoose";

const AnimalSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    catagory: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    imageUrls: [],
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("animal", AnimalSchema);
