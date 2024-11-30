import express from 'express';
import {login, signin} from '../controllers/authApkController.js';

const router = express.Router();

// Rutas de autenticación
router.post('/login', login);
router.post('/signin', signin);

export default router;