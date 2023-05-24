import mongoose from "mongoose";

const VetDoctorSchema = mongoose.Schema({
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
});

export default mongoose.model("vet_doctor", VetDoctorSchema);
