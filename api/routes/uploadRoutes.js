import express from 'express';
import multer from 'multer';
import path from 'path'; // Asegúrate de importar 'path'
import { uploadSingleFile, uploadMultipleFiles } from '../controllers/uploadController.js';
import {login, signin, getFilterUsers, getFilterUsersApk} from '../controllers/authApkController.js';

const router = express.Router();

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Se usa 'path.extname'
    }
});

const upload = multer({ storage });

// Ruta para subir un archivo
router.post('/single', upload.single('image'), uploadSingleFile);
router.get('/users', getFilterUsers);
router.get('/usersApk', getFilterUsersApk);

// Ruta para subir múltiples archivos
router.post('/register', upload.array('images', 5), uploadMultipleFiles);

router.post('/login', login);
router.post('/signin', signin);




export default router; // Cambiado a export default
