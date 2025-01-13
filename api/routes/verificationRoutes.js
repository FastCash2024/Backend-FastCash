import express from 'express';
import { createCredit, getAllCredits, getCreditById, updateCredit, deleteCredit, getCustomerFlow } from '../controllers/verificationController.js';

const router = express.Router();

router.post('/add', createCredit);
router.get('/', getAllCredits);
router.get('/customer', getCustomerFlow);
router.get('/:id', getCreditById);
router.put('/:id', updateCredit);
router.delete('/:id', deleteCredit);

export default router;
