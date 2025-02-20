import ComisionCollection from "../models/ComisionCollection.js";


export const createComision = async (req, res) => {
    try {
        const nuevaComision = new ComisionCollection(req.body);
        const resp = await nuevaComision.save();
        res.status(201).json(resp)
    } catch (error) {
        res.status(500).json({ message: `Error al crear la comision: ${error.message}` });
    }
}

export const getComisiones = async (req, res) => {
    try {
        const { aplicacion, segmento, desde, hasta, page = 1, limit = 5 } = req.query;

        let filtro = {};
        if (aplicacion) filtro.aplicacion = aplicacion;
        if (segmento) filtro.segmento = segmento;
        if (desde && hasta) {
            filtro.desde = { $gte: Number(desde) };
            filtro.hasta = { $lte: Number(hasta) };
        }

        const totalDocuments = await ComisionCollection.countDocuments(filtro);
        const comisiones = await ComisionCollection.find(filtro)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json({
            data: comisiones,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalDocuments / limit),
            totalDocuments,
        });
    } catch (error) {
        res.status(500).json({ message: `Error al obtener comisiones: ${error.message}` });
    }
};

export const getComisionById = async (req, res) => {
    try {
        const comision = await ComisionCollection.findById(req.params.id);
        if (!comision) {
            return res.status(404).json({ message: "La comision no existe." })
        }
        res.json(comision);
    } catch (error) {
        res.status(500).json({ message: `Error al obtener comision: ${error.message}` });
    }
}

export const updateComision = async (req, res) => {
    try {
        const comisionActualizada = await ComisionCollection.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!comisionActualizada) {
            return res.status(404).json({ message: "La comision no existe." })
        }
        res.json(comisionActualizada)
    } catch (error) {
        res.status(500).json({ message: `Error al actualizar la comision: ${error.message}` });
    }
}

export const deleteComision = async (req, res) => {
    try {
        const comisionEliminada = new ComisionCollection.findByIdAndDelete(req.params.id);
        if (!comisionEliminada) {
            return res.status(404).json({ message: "La comision no existe." })
        }
        res.json({ message: "Comision eliminada!" })
    } catch (error) {
        res.status(500).json({ message: `Error al actualizar la comision: ${error.message}` });
    }
}