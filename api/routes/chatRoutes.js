import express from "express";
import { getChat, saveMessage } from "../controllers/chatController.js";

const router = express.Router();

router.post('/savechat', saveMessage);

router.get('/:subId', getChat);

export default router;