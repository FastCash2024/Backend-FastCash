const StdDispersionSchema = new mongoose.Schema({
  success: Boolean,
  response: {
    resultado: {
      descripcionError: String,
      id: Number,
      data: {
        fechaOperacion: Number,
        institucionOperante: Number,
        claveRastreo: String,
        claveRastreoDevolucion: String,
        empresa: String,
        monto: Number,
        digit01IdentificadorBeneficiario: Number,
        medioEntrega: String,
        firma: String
      }
    }
  }
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

  // Nodo stdDispersionModel
  stdDispersionModel: [StdDispersionSchema]
}, {
  timestamps: true,
  collection: 'recoleccionYValidacionDeDatos'
});

export default mongoose.model('VerificationCollection', verificationCollectionSchema);
