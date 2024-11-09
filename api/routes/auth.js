import express from 'express';
import { register, login, registerPersonal, loginPersonal} from '../controllers/authController.js';
import { createUser, getAllUsers, getAllPersonalAccounts, getUserById, updateUser, deleteUser } from '../controllers/accessController.js';

const router = express.Router();

// Rutas de autenticación
router.post('/register', register);
router.post('/registerPersonal', registerPersonal);
router.post('/login', login);
router.post('/loginPersonal', loginPersonal);
router.get('/users', getAllUsers);
router.get('/personalAccounts', getAllPersonalAccounts);


export default router;










