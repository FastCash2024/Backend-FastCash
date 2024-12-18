import mongoose from 'mongoose';

const verificationCollectionSchema = new mongoose.Schema({
  // ----------DATOS DE TABLA --------Recolección y Validación de Datos
        // Datos enviados del celu
  numeroDePrestamo: String,
  idDeSubFactura: String,
  estadoDeCredito: String,
  nombreDelCliente: String,
  numeroDeTelefonoMovil: String,
  clienteNuevo: String,
  valorSolicitado: Number,
  valorEnviado: Number,
  registroDeNotas: String,
  nombreDelProducto: String,
  fechaDeReembolso: String,
  fechaDeCreacionDeLaTarea: String,
  fechaDeTramitacionDelCaso: String,
  nombreDeLaEmpresa: String,
      // Cuenta asignada desde el sistema
  apodoDeUsuarioDeCobro: String,
  cuentaVerificador: String,
      // Asesor asignado variable todods los dias
  asesor: String,
  emailAsesor: String,
  acotacionAsesor: String
}, {
  timestamps: true,
  collection: 'recoleccionYValidacionDeDatos'
});

export default mongoose.model('VerificationCollection', verificationCollectionSchema);