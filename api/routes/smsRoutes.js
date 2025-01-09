import express from 'express';
import { sendSMS, verificarSMS } from '../controllers/smsController.js';

const router = express.Router();

// Definir la ruta para enviar SMS
router.post('/send', sendSMS);

// Ruta para verificar codigo
router.post('/verificarSMS', verificarSMS);

export default router;
