import express from 'express';
import multer from 'multer';
import {
  handleFileUpload,
  handleFileUploadMultiples,
  handleFileGet,
  handleFileDelete,
  handleGetSignedUrl,
} from '../controllers/uploadControllerS3.js';
import {getFilterUsers, getFilterUsersApk, getFilterUsersApkFromWeb} from '../controllers/authApkController.js';

const router = express.Router();

// Configurar multer
const storage = multer.memoryStorage();
// const upload = multer({ storage });
// Configuración de Multer para manejar múltiples archivos
const upload = multer({
  storage: multer.memoryStorage(),  // Almacenamiento en memoria
  limits: { fileSize: 10 * 1024 * 1024 },  // Límite de tamaño de archivo (10MB)
});
// Rutas de S3
router.post('/upload', upload.single('file'), handleFileUpload);
router.post('/register', upload.array('files', 3), handleFileUploadMultiples);  // Permite hasta 10 archivos
// router.get('/:fileName', handleFileGet);
// router.delete('/:fileName', handleFileDelete);
// router.get('/signed-url/:fileName', handleGetSignedUrl);
router.get('/usersApk', getFilterUsersApk);
router.get('/usersApkFromWeb', getFilterUsersApkFromWeb);


export default router;
