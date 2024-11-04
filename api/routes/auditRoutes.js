import express from 'express';
import { createAuditLog, getAllAuditLogs, getAuditLogById, updateAuditLog, deleteAuditLog } from '../controllers/auditController.js';

const router = express.Router();

router.post('/', createAuditLog);
router.get('/', getAllAuditLogs);
router.get('/:id', getAuditLogById);
router.put('/:id', updateAuditLog);
router.delete('/:id', deleteAuditLog);

export default router;
