import express from "express";
import { getChat, /*getChatsUser,*/ saveMessage } from "../controllers/chatController.js";

const router = express.Router();

router.post('/savechat', saveMessage);

router.get('/:subId', getChat);
// router.get('/chatsusers', getChatsUser);

export default router;