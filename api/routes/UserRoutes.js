import express from "express";
import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const newUser = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = newUser.save();
    res.send("user registered ");
  } catch (error) {
    res.send(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email, password });
    if (user) {
      const temp = {
        username: user.username,
        isAdmin: user.isAdmin,
        email: user.email,
        _id: user._id,
      };

      res.send(temp);
    } else {
      res.send("error");
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    res.status(401).send("error occured white getting users");
  }
});
export default router;
