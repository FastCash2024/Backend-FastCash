import mongoose from 'mongoose';

const ContactosSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String
});
const SmsSchema = new mongoose.Schema({
  sender: String,
  body: String,
});
const AcotacionSchema = new mongoose.Schema({
  acotacion: String,
  cuenta: String,
  asesor: String,
  emailAsesor: String,
  fecha: String,
});
const TrackingDeOperacionesSchema = new mongoose.Schema({
  operacion: String,
  modificacion: String,
  fecha: String,

  cuenta: String,
  asesor: String,
  emailAsesor: String,
});

const CuentasBancariasSchema = new mongoose.Schema({
  nombreDeBanco: String,
  numeroDeCuenta: String,
  estadoDeCuenta: {
    type: String,
    enum: ['Activo', 'Bloqueado'],
    default: 'Activo',
  },
  acotacion: String,
});

const StdDispersionSchema = new mongoose.Schema({
  success: Boolean,
  descripcionError: String,
  id: Number,
  fechaOperacion: Number,
  institucionOperante: Number,
  claveRastreo: String,
  claveRastreoDevolucion: String,
  empresa: String,
  monto: Number,
  digitoIdentificadorBeneficiario: Number,
  medioEntrega: String,
  firma: String
}, { _id: false });

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

  valorPrestamoMenosInteres: Number,
  valorExtencion: Number,
  icon: String,

  numeroDeCuenta: String,
  nombreBanco: String,

  registroDeNotas: String,
  nombreDelProducto: String,
  fechaDeReembolso: String,
  fechaDeCreacionDeLaTarea: String,
  fechaDeTramitacionDelCaso: String,
  nombreDeLaEmpresa: String,
  
  // Datos capturados del caso
  contactos: [ContactosSchema],
  sms: [SmsSchema],

  // Usuario de verificación asignado
  apodoDeUsuarioDeVerificacion: String,
  cuentaVerificador: String,

  // Usuario de cobro asignado
  apodoDeUsuarioDeCobro: String,
  cuentaCobrador: String,

  // Usuario de auditoría asignado
  apodoDeUsuarioDeAuditoria: String,
  cuentaAuditor: String,

  // Asesor actual asignado
  asesor: String,
  emailAsesor: String,
  estadoDeComunicacion: String,
  fechaRegistroComunicacion: String,

  acotacionesCobrador: [AcotacionSchema],
  acotaciones: [AcotacionSchema],
  trackingDeOperaciones: [TrackingDeOperacionesSchema],
  cuentasBancarias: [CuentasBancariasSchema],
  stdDispersionModel: StdDispersionSchema
}, {
  timestamps: true,
  collection: 'recoleccionYValidacionDeDatos'
});

export default mongoose.model('VerificationCollection', verificationCollectionSchema);
