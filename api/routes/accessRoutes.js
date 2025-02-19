import express from 'express';
// import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/accessController.js';
import {asignationCases} from '../controllers/asignationController.js'
const router = express.Router();

// router.post('/', createUser);
router.get('/filters', asignationCases);
// router.get('/:id', getUserById);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

export default router;
