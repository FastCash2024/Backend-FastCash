import { ChatModel } from "../models/ChatModel.js";

export const saveMessage = async (req, res) => {
    try {
        const { subId, sender, body } = req.body;
        if (!subId || !sender || !body) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const newMessage = new ChatModel({
            subId,
            sender,
            body
        });

        await newMessage.save();

        res.status(201).json({ message: "Mensaje registrado", data: newMessage });
    } catch (error) {
        console.error('Error al guardar el mensaje: ', error);
        res.status(500).json({ message: 'Error al guardar mensaje' });
    }
}

export const getChat = async (req, res) => {
    try {
        const { subId } = req.params;
        let { limit = 5, page = 1 } = req.query;

        if (!subId) {
            return res.status(400).json({ message: "El subId es obligatorio" });
        }

        // 🔹 Forzar que subId sea String para la consulta
        const filter = { subId: String(subId) };

        limit = parseInt(limit);
        page = parseInt(page);
        if (isNaN(limit) || limit <= 0) limit = 5;
        if (isNaN(page) || page <= 0) page = 1;

        const skip = (page - 1) * limit;

        // 🔹 Imprimir la consulta antes de ejecutarla
        console.log("Consultando con filtro:", filter);

        const mensajes = await ChatModel.find(filter)
            .sort({ fecha: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        console.log("Mensajes encontrados:", mensajes);

        if (mensajes.length === 0) {
            return res.status(404).json({ message: `No se encontraron mensajes para ${subId}.` });
        }

        const totalDocuments = await ChatModel.countDocuments(filter);
        const totalPages = Math.ceil(totalDocuments / limit);

        res.status(200).json({ mensajes, currentPage: page, totalPages, totalDocuments });
    } catch (error) {
        console.error("Error al obtener los mensajes:", error);
        res.status(500).json({ message: 'Error al obtener los mensajes.' });
    }
};

