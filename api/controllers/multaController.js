import MultaCollection from "../models/MultaCollection.js";

export const addMulta = async (req, res) => {
    try {
        const { /*userId,*/ importeMulta, cuentaOperativa, cuentaPersonal, fechaDeOperacion, fechaDeAuditoria, acotacion } = req.body;

        const nuevaMulta = new MultaCollection({
            // userId,
            importeMulta,
            cuentaOperativa,
            cuentaPersonal,
            fechaDeOperacion,
            fechaDeAuditoria, 
            acotacion
        });

        await nuevaMulta.save();
        res.status(201).json(nuevaMulta);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar la multa', details: error.message });
    }
};

export const editMulta = async (req, res) => {
    try {
        const { id } = req.params;
        const { /*userId,*/ importeMulta, cuentaOperativa, cuentaPersonal, fechaDeOperacion, fechaDeAuditoria, acotacion } = req.body;

        const multa = await MultaCollection.findById(id);
        if (!multa) {
            return res.status(404).json({ message: 'Multa no encontrada' });
        }

        // multa.userId = userId;
        multa.importeMulta = importeMulta;
        multa.cuentaOperativa = cuentaOperativa;
        multa.cuentaPersonal = cuentaPersonal;
        multa.fechaDeOperacion = fechaDeOperacion;
        multa.fechaDeAuditoria = fechaDeAuditoria;
        multa.acotacion = acotacion;

        await multa.save();
        res.status(200).json(multa);
    } catch (error) {
        res.status(500).json({ message: 'Error al editar la multa', details: error.message });
    }
};

export const deleteMulta = async (req, res) => {
    try {
        const { id } = req.params;

        const multa = await MultaCollection.findById(id);
        if (!multa) {
            return res.status(404).json({ message: 'Multa no encontrada' });
        }

        await multa.remove();
        res.status(200).json({ message: 'Multa eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la multa', details: error.message });
    }
};

export const getMultaById = async (req, res) => {
    try {
        const { id } = req.params;

        const multa = await MultaCollection.findById(id);
        if (!multa) {
            return res.status(404).json({ message: 'Multa no encontrada' });
        }

        res.status(200).json(multa);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la multa', details: error.message });
    }
};

export const getAllMultas = async (req, res) => {
    try {
        const { cuentaOperativa, cuentaPersonal, fechaInicioOperacion, fechaFinOperacion, fechaInicioAuditoria, fechaFinAuditoria, page = 1, limit = 10 } = req.query;

        const limitInt = parseInt(limit, 10);
        const pageInt = parseInt(page, 10);

        const filter = {};
        if (cuentaOperativa) {
            filter.cuentaOperativa = cuentaOperativa;
        }
        if (cuentaPersonal) {
            filter.cuentaPersonal = cuentaPersonal;
        }
        if (fechaInicioOperacion && fechaFinOperacion) {
            filter.fechaDeOperacion = {
                $gte: new Date(fechaInicioOperacion),
                $lte: new Date(fechaFinOperacion)
            };
        }
        if (fechaInicioAuditoria && fechaFinAuditoria) {
            filter.fechaDeAuditoria = {
                $gte: new Date(fechaInicioAuditoria),
                $lte: new Date(fechaFinAuditoria)
            };
        }

        const totalDocuments = await MultaCollection.countDocuments(filter);

        const multas = await MultaCollection.find(filter)
            .skip((pageInt - 1) * limitInt)
            .limit(limitInt);

        const totalPages = Math.ceil(totalDocuments / limitInt);

        res.status(200).json({
            data: multas,
            currentPage: pageInt,
            totalPages,
            totalDocuments
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las multas', details: error.message });
    }
};

// export const getMultasByUserId = async (req, res) => {
//     try {
//         const { userId } = req.params;

//         const multas = await MultaCollection.find({ userId });
//         if (multas.length === 0) {
//             return res.status(404).json({ message: 'No se encontraron multas para este usuario' });
//         }

//         res.status(200).json(multas);
//     } catch (error) {
//         res.status(500).json({ message: 'Error al obtener las multas del usuario', details: error.message });
//     }
// };