import express from 'express';
import { sendSMS } from '../controllers/smsController.js';

const router = express.Router();

// Definir la ruta para enviar SMS
router.post('/send', sendSMS);

export default router;
