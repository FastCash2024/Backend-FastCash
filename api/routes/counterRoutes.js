import express from 'express';
import { getCounter, incrementCounter, resetCounter } from '../controllers/accessCounterController.js'

const router = express.Router();

// Ruta para obtener el valor de un contador específico
router.get('/:name', getCounter);

// Ruta para incrementar el valor de un contador específico
router.put('/:name/increment', incrementCounter);

// Ruta para resetear el valor de un contador específico
router.put('/:name/reset', resetCounter);

export default router;
