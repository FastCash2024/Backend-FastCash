import express from 'express';
import {login, signin, getFilterUsers} from '../controllers/authApkController.js';

const router = express.Router();

// Rutas de autenticación
router.post('/login', login);
router.post('/signin', signin);

router.get('/users', getFilterUsers);



export default router;