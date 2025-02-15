import express from 'express';
import { getSmsLogs, sendCustomSMS, sendSMSOtp, verificarOTP } from '../controllers/smsController.js';

const router = express.Router();

// Definir la ruta para enviar SMS
router.post('/sendOTP', sendSMSOtp);

router.post('/smsSend', sendCustomSMS);
router.get('/obtenersms', getSmsLogs);

// Ruta para verificar codigo
router.post('/verificarOTP', verificarOTP);

export default router;
