import express from "express";
import AnimalModel from "../models/AnimalModel.js";

const router = express.Router();

router.post("/addanimal", async (req, res) => {
  try {
    const newAnimal = new AnimalModel(req.body);
    await newAnimal.save();
    res.send("animal added successfully.");
  } catch (error) {
    res.status(403).send("error while adding animal");
  }
});

router.get("/getallanimals", async (req, res) => {
  try {
    const animals = await AnimalModel.find();
    res.send(animals);
  } catch (error) {
    res
      .status(403)
      .json({ message: "error occured while searching for animals" });
  }
});

router.post("/getananimal", async (req, res) => {
  try {
    const animalID = req.body.animalID;
    const animal = await AnimalModel.findById({
      _id: animalID,
    });
    res.json(animal);
  } catch (error) {
    res.status(404).json({ message: "animal is not found!" });
  }
});

export default router;
