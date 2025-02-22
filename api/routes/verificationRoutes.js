import express from 'express';
import { createCredit, getAllCredits, getCreditById, getCreditByPhone, updateCredit, deleteCredit, getCustomerFlow, getReporteDiario, getReporteCDiario, getUpdateSTP, updateCreditoAprobado, reporteComision } from '../controllers/verificationController.js';

const router = express.Router();

router.post('/add', createCredit);
router.get('/', getAllCredits);
router.get('/reporte', getReporteDiario);
router.get('/reportecobrados', getReporteCDiario);
// router.get('/customers', getCustomers);
router.get('/customer', getCustomerFlow);
router.get('/phone', getCreditByPhone);
router.get('/reportcomision', reporteComision);
router.get('/:id', getCreditById);
router.get('/updateSTP/:idDeSubFactura', getUpdateSTP);
router.put('/:id', updateCredit);
router.put('/creditoaprobado/:id', updateCreditoAprobado);
router.delete('/:id', deleteCredit);

export default router;
