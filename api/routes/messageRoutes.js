import express from "express";
import { addMessage, getMsg } from "../controllers/messageControllers.js";

const router = express.Router();

router.post("/", addMessage);
router.get("/:chatID", getMsg);
export default router;
