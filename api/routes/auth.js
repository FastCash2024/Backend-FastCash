import express from 'express';
import { register, login, registerPersonal, loginPersonal, updateUser,updateUserPersonal, getUsersWithFilters, getProfileWithToken} from '../controllers/authController.js';
import { getAllUsers, getAllPersonalAccounts} from '../controllers/accessController.js';
import multer from 'multer';

const router = express.Router();


const storage = multer.memoryStorage();
// Configuración de Multer para manejar múltiples archivos
const upload = multer({
  storage: multer.memoryStorage(),  // Almacenamiento en memoria
  limits: { fileSize: 50 * 1024 * 1024 },  // Límite de tamaño de archivo (10MB)
});

// Rutas de autenticación
router.post('/register', register);
router.post('/login', login);
router.get('/validate', getProfileWithToken);
router.put('/register/:userId', updateUser);
router.get('/users', getAllUsers);


//Login, register and Update en cuenta personal
router.post('/registerPersonal', registerPersonal);
router.post('/loginPersonal', loginPersonal);
router.put('/registerPersonal/:userId', upload.single('file'), updateUserPersonal);
router.get('/personalAccounts',  getAllPersonalAccounts);
router.get('/usersFilter', getUsersWithFilters);





export default router;










