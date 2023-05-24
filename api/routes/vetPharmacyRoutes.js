import express from "express";
import vetPharmacyModel from "../models/vetPharmacyModel.js";

const router = express.Router();

router.post("/addvetpharmacy", async (req, res) => {
  try {
    const newVetPharmacy = new vetPharmacyModel(req.body);
    await newVetPharmacy.save();
    res.send("Pharmacy added successfully.");
  } catch (error) {
    res.status(403).send("error while adding pharmacy");
  }
});

router.get("/getallvetPharmacy", async (req, res) => {
  try {
    const vetPharmacies = await vetPharmacyModel.find();
    res.send(vetPharmacies);
  } catch (error) {
    res
      .status(403)
      .json({ message: "error occured while searching for pharmacies" });
  }
});

export default router;
