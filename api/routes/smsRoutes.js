import express from 'express';
import { getSmsLogs, sendCustomSMS, sendSMS, verificarSMS } from '../controllers/smsController.js';

const router = express.Router();

// Definir la ruta para enviar SMS
router.post('/send', sendSMS);

router.post('/smsSend', sendCustomSMS);
router.get('/obtenersms', getSmsLogs);

// Ruta para verificar codigo
router.post('/verificarSMS', verificarSMS);

export default router;
