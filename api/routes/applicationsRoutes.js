import express from 'express';
import { register,getApplications, getCustomers,  deleteApplication, updateApplication, getApplicationsToApp, addTipoApplication, updateTipoApplication, deleteTipoApplication, getApplicationsById } from '../controllers/applicationsController.js';
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
router.get('/aplicationbyid/:id', getApplicationsById);
router.get('/customers', getCustomers);
// tipos aplicacion
router.post('/addtipoaplicacion/:id', addTipoApplication);
router.put('/updatetipoaplicacion/:id/:nivelDePrestamo', updateTipoApplication);
router.delete('/deletetipoaplicacion/:id/:nivelDePrestamo', deleteTipoApplication);

export default router;