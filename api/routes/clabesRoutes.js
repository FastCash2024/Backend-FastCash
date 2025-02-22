import express from 'express';
import Counter from '../models/CounterClabesCollection.js'; // Asegúrate de que la ruta sea correcta

const router = express.Router();


// Función para obtener el número actual sin modificarlo
const getCurrentSequentialNumber = async () => {
    try {
        const counter = await Counter.findOne({ name: 'cuenta concentradora' });
        return counter ? counter.count : 0;
    } catch (error) {
        console.error('Error al obtener el número actual:', error);
        throw error;
    }
};

// Función para incrementar el contador sin recuperar datos
const incrementSequentialNumber = async () => {
    try {
        await Counter.findOneAndUpdate(
            { name: 'cuenta concentradora' },
            { $inc: { count: 1 } },
            { upsert: true }
        );
    } catch (error) {
        console.error('Error al incrementar el número secuencial:', error);
        throw error;
    }
};

// Endpoint para obtener el número actual
router.get('/counter/current', async (req, res) => {
    try {
        const count = await getCurrentSequentialNumber();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el número actual' });
    }
});

// Endpoint para incrementar el número
router.post('/counter/increment', async (req, res) => {
    try {
        await incrementSequentialNumber();
        res.json({ message: 'Número incrementado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al incrementar el número' });
    }
});


export default router;