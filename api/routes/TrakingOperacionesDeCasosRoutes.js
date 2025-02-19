import express from 'express';
import { createTrackings, getTrackings, updateTrackingById } from '../controllers/TrakingOperacionesDeCasos.js';

const router = express.Router();

router.get('/', getTrackings);
router.get('/add', createTrackings);
router.get('/update', updateTrackingById);

export default router;
