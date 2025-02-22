import mongoose from 'mongoose';

const ComisionSchema = new mongoose.Schema({
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
