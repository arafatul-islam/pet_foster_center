import VetDoctorModel from "../models/VetDoctorModel.js";
import express from "express";

const router = express.Router();

router.post("/addvetdoctor", async (req, res) => {
  try {
    const newVetDoc = new VetDoctorModel(req.body);
    await newVetDoc.save();
    res.send("Doctor added successfully.");
  } catch (error) {
    res.status(403).send("error while adding doctor");
  }
});

router.get("/getallvetdoctors", async (req, res) => {
  try {
    const vetDoctors = await VetDoctorModel.find();
    res.send(vetDoctors);
  } catch (error) {
    res
      .status(403)
      .json({ message: "error occured while searching for doctors" });
  }
});

export default router;
