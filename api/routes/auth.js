import express from 'express';
import { register, login, registerPersonal, loginPersonal, updateUser,updateUserPersonal, getUsersWithFilters, getProfileWithToken} from '../controllers/authController.js';
import { getAllUsers, getAllPersonalAccounts} from '../controllers/accessController.js';

const router = express.Router();

// Rutas de autenticación
router.post('/register', register);
router.post('/registerPersonal', registerPersonal);
router.post('/login', login);
router.get('/validate', getProfileWithToken);
router.post('/loginPersonal', loginPersonal);
router.get('/users', getAllUsers);
router.get('/personalAccounts', getAllPersonalAccounts);
router.put('/register/:userId', updateUser);
router.put('/registerPersonal/:userId', updateUserPersonal);
router.get('/usersFilter', getUsersWithFilters);


export default router;










