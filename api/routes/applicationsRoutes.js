import express from 'express';
import { register,getApplications, getCustomers } from '../controllers/applicationsController.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
// Configuración de Multer para manejar múltiples archivos
const upload = multer({
  storage: multer.memoryStorage(),  // Almacenamiento en memoria
  limits: { fileSize: 10 * 1024 * 1024 },  // Límite de tamaño de archivo (10MB)
});

router.post('/register', upload.single('file'), register);
// Rutas de autenticación
// router.post('/register', register);
router.get('/getApplications', getApplications);
router.get('/customers', getCustomers);

export default router;