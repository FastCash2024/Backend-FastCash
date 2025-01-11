import { AttendanceModel } from "../models/AttendanceModel.js";
import User from '../models/AuthCollection.js';
import { getCurrentWeekRange } from "../utilities/currentWeek.js";

const getUserAttendance = async (userId, start, end) => {
    try {
        console.log("getUserAttendance - start:", start);
        console.log("getUserAttendance - end:", end);

        const attendances = await AttendanceModel.find({
            user: userId,
            fecha: {
                $gte: start,
                $lte: end,
            },
        }).lean();

        const attendanceMap = {};
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const formattedDate = d.toISOString().split('T')[0];
            const attendanceRecord = attendances.find(
                (att) => att.fecha.toISOString().split('T')[0] === formattedDate
            );
            attendanceMap[formattedDate] = attendanceRecord
                ? attendanceRecord.EstadoDeAsistencia
                : "Libre"; // Si no hay registro, se asume que faltó
        }

        return attendanceMap;
    } catch (error) {
        console.error("Error al obtener la asistencia del usuario:", error);
        throw error;
    }
};

export const getUsersAttendance = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        console.log("startDate:", startDate);
        console.log("endDate:", endDate);

        let start, end;
        if (startDate && endDate) {
            start = new Date(startDate);
            end = new Date(endDate);
        } else {
            const currentWeekRange = getCurrentWeekRange();
            start = currentWeekRange.start;
            end = currentWeekRange.end;
        }

        // Verificar que start y end estén definidos
        console.log("start:", start);
        console.log("end:", end);

        if (!start || !end) {
            throw new Error("Las fechas de inicio y fin no están definidas");
        }

        const users = await User.find({}).lean();

        console.log("users:", users);

        const result = await Promise.all(
            users.map(async (user) => ({
                usuario: user.cuenta,
                tipoDeGrupo: user.tipoDeGrupo,
                asistencias: await getUserAttendance(user._id, start, end),
            }))
        );

        res.status(200).json(result);

    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({
            error: "Error al obtener los usuarios",
            details: error.message
        });
    }
};

export const registerAttendance = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: "Usuario no encontrado",
            });
        }

        const fechaHoy = new Date();
        const inicioDelDia = new Date(fechaHoy.setHours(0, 0, 0, 0)); 
        const finDelDia = new Date(fechaHoy.setHours(23, 59, 59, 999));

        const asistenciaExistente = await AttendanceModel.findOne({
            user: userId,
            fecha: {
                $gte: inicioDelDia,
                $lte: finDelDia,
            },
        });

        if (asistenciaExistente) {
            return res.status(200).json({
                message: "Ya has marcado tu asistencia hoy",
            });
        }

        const horaActual = new Date();
        const horaEntrada = `${horaActual.getHours()}:${horaActual.getMinutes()}`;
        const horaSalida = '18:00'

        const horaLimite2 = new Date(fechaHoy);
        horaLimite2.setHours(8, 15, 0, 0); // 8:15 AM

        const horaLimite3 = new Date(fechaHoy);
        horaLimite3.setHours(8, 25, 0, 0); // 8:25 AM

        const horaLimite4 = new Date(fechaHoy);
        horaLimite4.setHours(8, 30, 0, 0); // 8:30 AM

        let estadoDeAsistencia;

        if (horaActual < horaLimite2) {
            estadoDeAsistencia = 'Operando';
        } else if (horaActual >= horaLimite2 && horaActual < horaLimite3) {
            estadoDeAsistencia = 'Atraso-1';
        } else if (horaActual >= horaLimite3 && horaActual <= horaLimite4) {
            estadoDeAsistencia = 'Atraso-2';
        } else if (horaActual > horaLimite4) {
            estadoDeAsistencia = 'Falta';   
        }

        const newAttendance = new AttendanceModel({
            user: userId,
            fecha: new Date(),
            horaEntrada,
            horaSalida,
            EstadoDeAsistencia: estadoDeAsistencia,
            observaciones: ''
        });

        console.log("newAttendance", newAttendance);
        
        await newAttendance.save();

        res.status(201).json({
            message: 'Asistencia registrada',
            asistencia: newAttendance,
          });

    } catch (error) {
        res.status(500).json({
            error: "Error al registrar la asistencia",
            details: error.message,
        });
    }
}