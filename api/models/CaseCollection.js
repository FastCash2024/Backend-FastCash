import mongoose from 'mongoose';

const caseCollectionSchema = new mongoose.Schema({
  Contactos: String,
  Número_de_prestamo: String,
  ID_de_sub_factura: String,
  Estado_de_credito: String,
  Nombre_del_cliente: String,
  Número_de_tel_movil: String,
  Clientes_nuevos: Boolean,
  Valor_solicitado_VS: Number,
  Valor_enviado_VE: Number,
  Registro_de_notas: String,
  Nombre_del_producto: String,
  Fecha_de_reembolso: Date,
  Fecha_de_creacion_tarea: Date,
  Fecha_de_tramitacion_caso: Date,
  Nombre_de_la_empresa: String,
  Apodo_de_usuario_de_cobro: String
}, {
  timestamps: true,
  collection: 'Recolección y Validación de Datos'
});

export default mongoose.model('CaseCollection', caseCollectionSchema);