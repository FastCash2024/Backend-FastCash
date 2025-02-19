import mongoose from 'mongoose'

// Esquema del contador individual
const counterSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    count: { type: Number, required: true, default: 0 },
}, {
    timestamps: true,
    collection: 'counterAccess'
});

// Exportar el modelo Counter
export default mongoose.model('CounterAccessCollection', counterSchema);




// import mongoose from 'mongoose';

// const counterAccsessCollectionSchema = new mongoose.Schema({
//     superAdmin: Number,
    // recursosHumanos: Number,
    // admin: Number,
    // managerDeAuditoria: Number,
    // managerDeCobranza: Number,
    // managerDeVerificación: Number,
    // usuarioDeAuditoria: Number,
    // usuarioDeCobranzaD2: Number,
    // usuarioDeCobranzaD1: Number,
    // usuarioDeCobranzaD0: Number,
    // usuarioDeCobranzaS1: Number,
    // usuarioDeCobranzaS2: Number,
    // usuarioDeVerificación: Number,
    // cuentaPersonal: Number
// }, {
//     timestamps: true,
//     collection: 'counterAccsessCollection'
// });

// export default mongoose.model('CounterAccsessCollection', verificationCollectionSchema);