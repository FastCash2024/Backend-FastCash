import express from 'express';
import { register,getApplications } from '../controllers/applicationsController.js';

const router = express.Router();

// Rutas de autenticación
router.post('/register', register);
router.get('/getApplications', getApplications);


export default router;