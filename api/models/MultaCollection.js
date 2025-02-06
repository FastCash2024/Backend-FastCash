import mongoose from 'mongoose';

const MultaSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
    fechadeOperacion: {
        type: String,
        required: true
    },
    fechaDeAuditoria: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'multas'
});

export default mongoose.model('Multa', MultaSchema);