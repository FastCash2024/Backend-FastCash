import mongoose from 'mongoose'

// Esquema del contador individual
const counterSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    count: { type: Number, required: true, default: 0 },
}, {
    timestamps: true,
    collection: 'CounterClabes'
});

// Exportar el modelo Counter
export default mongoose.model('CounterClabesCollection', counterSchema);