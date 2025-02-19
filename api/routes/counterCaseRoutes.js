// api/routes/counterRoutes.js
import express from 'express';
import { getVerificationCount } from '../controllers/verificationController.js';

const router = express.Router();
// Ruta para obtener el conteo total de documentos en la colección 'Verification'
router.get('/verification/count', getVerificationCount);

export default router;
