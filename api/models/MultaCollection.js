import mongoose from 'mongoose';

const MultaSchema = new mongoose.Schema({
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    importeMulta: {
        type: Number,
        required: true
    },
    cuentaOperativa: {
        type: String,
        required: true,
        trim: true
    },
    cuentaPersonal: {
        type: String,
        required: true,
        trim: true
    },
    cuentaAuditor: {
        type: String,
        required: true,
        trim: true
    },
    cuentaPersonalAuditor: {
        type: String,
        required: true,
        trim: true
    },
    fechaDeOperacion: {
        type: String,
        required: true
    },
    fechaDeAuditoria: {
        type: String,
        required: true
    },
    acotacion: {
        type: String,
        required: true
    },
    seccionMulta: {
        type: String,
        required: true,
    },
    observaciones: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    collection: 'multas'
});

export default mongoose.model('Multa', MultaSchema);