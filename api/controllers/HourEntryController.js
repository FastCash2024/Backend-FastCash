import { EntryTimeModel } from "../models/HourEntryModel.js";

export const registerEntryTime = async (req, res) => {
    const { horaEntrada } = req.body;

    try {
        const exists = await EntryTimeModel.checkIfExistsForToday();

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Ya has registrado la hora de entrada para hoy.",
            });
        }

        const newEntryTime = new EntryTimeModel({
            horaEntrada,
            fechaEntrada: new Date().toISOString().split('T')[0],
        });

        newEntryTime.calculateHoraSalida();

        await newEntryTime.save();

        return res.status(201).json({
            success: true,
            message: "Hora de entrada registrada correctamente.",
        });
    } catch (error) {
        console.error("Error al registrar la hora de entrada: ", error);
        return res.status(500).json({
            success: false,
            message: "Hubo un error al registrar la hora de entrada.",
        });
    }
};

export const getEntryTimeForToday = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        
        const entryTime = await EntryTimeModel.findOne({ fechaEntrada: today });

        if (!entryTime) {
            return res.status(404).json({
                message: "No se encontró un registro de hora de entrada para hoy.",
            });
        }

        return res.status(200).json({
            data: entryTime,
        });
    } catch (error) {
        console.error("Error al obtener la hora de entrada de hoy: ", error);
        return res.status(500).json({
            success: false,
            message: "Hubo un error al obtener la hora de entrada de hoy.",
        });
    }
};
