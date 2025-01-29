import express from 'express';
import { createCredit, getAllCredits, getCreditById, getCreditByPhone, updateCredit, deleteCredit, getCustomerFlow, getReporteDiario, getReporteCDiario } from '../controllers/verificationController.js';

const router = express.Router();

router.post('/add', createCredit);
router.get('/', getAllCredits);
router.get('/reporte', getReporteDiario);
router.get('/reportecobrados', getReporteCDiario);
// router.get('/customers', getCustomers);
router.get('/customer', getCustomerFlow);
router.get('/phone', getCreditByPhone);
router.get('/:id', getCreditById);
router.put('/:id', updateCredit);
router.delete('/:id', deleteCredit);

export default router;
