import { mongoose } from "mongoose";

const EntryTimeSchema = new mongoose.Schema({
    horaEntrada: {
        type: String,
        required: true,
    },
    horaSalida: {
        type: String,
        required: true,
    },
    fechaEntrada: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

EntryTimeSchema.methods.calculateHoraSalida = function () {
    const entrada = new Date(`${this.fechaEntrada}T${this.horaEntrada}:00`);
    const salida = new Date(entrada.getTime() + 8 * 60 * 60 * 1000); 

    const hours = salida.getHours().toString().padStart(2, '0');
    const minutes = salida.getMinutes().toString().padStart(2, '0');
    this.horaSalida = `${hours}:${minutes}`;
};

EntryTimeSchema.pre("save", function (next) {
    if (!this.fechaEntrada) {
        this.fechaEntrada = new Date().toISOString().split('T')[0]; 
    }
    this.calculateHoraSalida();
    next();
});

EntryTimeSchema.statics.checkIfExistsForToday = async function () {
    const today = new Date().toISOString().split('T')[0];
    const existingEntry = await this.findOne({
        fechaEntrada: today,
    });

    return existingEntry ? true : false;
};

export const EntryTimeModel = mongoose.model("EntryTime", EntryTimeSchema);
