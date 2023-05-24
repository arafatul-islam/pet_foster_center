import express from "express";
import {
  createChat,
  findChats,
  userChats,
} from "../controllers/chatControllers.js";

const router = express.Router();

router.post("/", createChat);
router.get("/:userID", userChats);
router.get("/find/:firstID/:secondID", findChats);

export default router;
