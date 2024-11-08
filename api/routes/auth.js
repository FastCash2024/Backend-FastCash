import express from 'express';
import { register, login } from '../controllers/authController.js';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/accessController.js';

const router = express.Router();

// Rutas de autenticación
router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);


export default router;










