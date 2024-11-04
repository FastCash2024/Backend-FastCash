import mongoose from 'mongoose';

const verificationCollectionSchema = new mongoose.Schema({
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
  collection: 'recoleccionYValidacionDeDatos'
});

export default mongoose.model('VerificationCollection', verificationCollectionSchema);