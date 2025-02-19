import { mongoose } from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatoria']
    },
    horaEntrada: {
        type: String,
        required: [true, 'La hora de entrada es obligatoria']
    },
    horaSalida: {
        type: String,
        required: [true, 'La hora de salida es obligatoria']
    },
    EstadoDeAsistencia: {
        type: String,
        enum: ['Libre', 'Operando', 'Atraso-1', 'Atraso-2', 'Falta'],
        default: 'Operando',
        required: [true, 'El estado de asistencia es obligatorio']
    },
    observaciones: {
        type: String,
        default: ''
    }
}, {timestamps: true});

export const AttendanceModel = mongoose.model('Attendance', AttendanceSchema);