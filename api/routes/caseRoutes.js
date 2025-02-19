import express from 'express';
import { createCase, getAllCases, getCaseById, updateCase, deleteCase } from '../controllers/caseController.js';

const router = express.Router();

router.post('/', createCase);
router.get('/', getAllCases);
router.get('/:id', getCaseById);
router.put('/:id', updateCase);
router.delete('/:id', deleteCase);

export default router;
