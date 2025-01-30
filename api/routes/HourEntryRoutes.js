import express from 'express';
import { getEntryTimeForToday, registerEntryTime } from '../controllers/HourEntryController.js';

const router = express.Router();

// Registrar hora de entrada
router.post('/register', registerEntryTime);

router.get('/gethour', getEntryTimeForToday);

export default router;
