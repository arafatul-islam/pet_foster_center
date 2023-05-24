import mongoose from "mongoose";

const vetPharmacySchema = mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  map: {
    type: String,
  },
  image: { type: String },
});

export default mongoose.model("vet_pharmacy", vetPharmacySchema);
