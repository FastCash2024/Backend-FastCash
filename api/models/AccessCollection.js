import mongoose from 'mongoose';

const accessCollectionSchema = new mongoose.Schema({
    numeroDePrestamo: String,
    idDeSubFactura: String,
    estadoDeCredito: String,
    nombreDelCliente: String,
    numeroDeTelMovil: String,
    clientesNuevos: Boolean,
    valorSolicitadoVS: Number,
    valorEnviadoVE: Number,
    registroDeNotas: String,
    nombreDelProducto: String,
    fechaDeReembolso: Date,
    fechaDeCreacionTarea: Date,
    fechaDeTramitacionCaso: Date,
    nombreDeLaEmpresa: String,
    apodoDeUsuarioDeCobro: String
}, {
  timestamps: true,
  collection: 'gestionDeAccesos'
});

export default mongoose.model('AccessCollection', accessCollectionSchema);