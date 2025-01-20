import express from 'express';
import { register,getApplications, getCustomers, deleteApplication, updateApplication } from '../controllers/applicationsController.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
// Configuración de Multer para manejar múltiples archivos
const upload = multer({
  storage: multer.memoryStorage(),  // Almacenamiento en memoria
  limits: { fileSize: 10 * 1024 * 1024 },  // Límite de tamaño de archivo (10MB)
});

router.post('/register', upload.single('file'), register);
router.put('/update/:id', upload.single('file'), updateApplication);
router.delete('/delete/:id', deleteApplication);
// Rutas de autenticación
// router.post('/register', register);
router.get('/getApplications', getApplications);
router.get('/getApplicationsToApp', getApplicationsToApp);
router.get('/customers', getCustomers);

export default router;