import express from 'express';
import { createCredit, getAllCredits, getCreditById, updateCredit, deleteCredit } from '../controllers/verificationController.js';

const router = express.Router();

router.post('/', createCredit);
router.get('/', getAllCredits);
router.get('/:id', getCreditById);
router.put('/:id', updateCredit);
router.delete('/:id', deleteCredit);

export default router;
