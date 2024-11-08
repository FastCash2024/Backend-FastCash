import mongoose from 'mongoose';

const verificationCollectionSchema = new mongoose.Schema({
    numeroDePrestamo: String,
    idDeSubFactura: String,
    estadoDeCredito: String,
    nombreDelCliente: String,
    numeroDeTelefonoMovil: String,
    clientesNuevos: String,
    valorSolicitado: Number,
    valorEnviado: Number,
    registroDeNotas: String,
    nombreDelProducto: String,
    fechaDeReembolso: String,
    fechaDeCreacionDeLaTarea: String,
    fechaDeTramitacionDelCaso: String,
    nombreDeLaEmpresa: String,
    apodoDeUsuarioDeCobro: String
}, {
  timestamps: true,
  collection: 'recoleccionYValidacionDeDatos'
});

export default mongoose.model('VerificationCollection', verificationCollectionSchema);