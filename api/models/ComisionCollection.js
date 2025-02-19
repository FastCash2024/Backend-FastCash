import mongoose from 'mongoose';

const ComisionSchema = new mongoose.Schema({
    aplicacion: {
        type: String,
        required: true,
        trim: true
    },
    segmento: {
        type: String,
        required: true,
        trim: true
    },
    desde: {
        type: String,
        required: true
    },
    hasta: {
        type: String,
        required: true
    },
    comisionPorCobro: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    collection: 'comisiones'
});

export default mongoose.model('Comision', ComisionSchema);
