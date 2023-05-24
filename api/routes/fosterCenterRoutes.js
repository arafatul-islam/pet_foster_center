import express from "express";
import FosterCenterModel from "../models/fosterCenterModel.js";

const router = express.Router();

router.get("/getallfostercenters", async (req, res) => {
  try {
    const fosterCenters = await FosterCenterModel.find({});
    res.send(fosterCenters);
  } catch (error) {
    res.status(404).json({ message: "foster centers not found!" });
  }
});

router.post("/getafostercenterbyid", async (req, res) => {
  try {
    const fostercenterid = req.body.fostercenterid;
    const fosterCenter = await FosterCenterModel.findById({
      _id: fostercenterid,
    });
    res.json(fosterCenter);
  } catch (error) {
    res.status(404).json({ message: "foster center is not found!" });
  }
});

router.post("/addfostercenter", async (req, res) => {
  try {
    const newFc = new FosterCenterModel(req.body);
    await newFc.save();
    res.send("foster center added successfully.");
  } catch (error) {
    res.status(403).send("error while creating foster center");
  }
});

// product

export default router;
