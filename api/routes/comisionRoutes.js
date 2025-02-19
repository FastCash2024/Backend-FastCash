import express from 'express';
import { createComision, deleteComision, getComisionById, getComisiones, updateComision } from '../controllers/comisionController.js';

const router = express.Router();

router.post('/', createComision);
router.put('/:id', updateComision);
router.delete('/delete/:id', deleteComision);
router.get('/', getComisiones);
router.get('/:id', getComisionById);
// router.get('/reporte', getReporteDiarioMultas);
// router.get('/multas/user/:userId', getMultasByUserId);

export default router;