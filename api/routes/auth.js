import express from 'express';
import { register, login, registerPersonal, loginPersonal, updateUser} from '../controllers/authController.js';
import { getAllUsers, getAllPersonalAccounts} from '../controllers/accessController.js';

const router = express.Router();

// Rutas de autenticación
router.post('/register', register);
router.post('/registerPersonal', registerPersonal);
router.post('/login', login);
router.post('/loginPersonal', loginPersonal);
router.get('/users', getAllUsers);
router.get('/personalAccounts', getAllPersonalAccounts);
router.put('/register/:userId', updateUser);


export default router;










