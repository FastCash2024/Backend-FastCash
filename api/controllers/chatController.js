import { ChatModel } from "../models/ChatModel.js";

export const saveMessage = async (req, res) => {
    try {
        const {subId, sender, body} = req.body;
        if (!subId || !sender || !body) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const newMessage = new ChatModel({
            subId,
            sender,
            body
        });

        await newMessage.save();

        res.status(201).json({ message: "Mensaje registrado", data: newMessage});
    } catch (error) {
        console.error('Error al guardar el mensaje: ', error);
        res.status(500).json({message: 'Error al guardar mensaje'});
    }
}

export const getChat = async (req, res) => {
    try {
        const { subId } = req.params;

        if (!subId) {
            return res.status(400).json({ message: "El subId es obligatorio"})
        }

        const mensajes = await ChatModel.find({subId}).sort({createAt: 1}).lean();

        if (mensajes.length === 0) {
            return res.status(404).json({ message: `No se encontraron mensajes para ${subId}.`})
        }

        const data = { 
            mensajes
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: 'Error al obtener los mensajes.'});
    }
}