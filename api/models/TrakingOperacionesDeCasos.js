import mongoose from 'mongoose';

// Esquema para Acotaciones del Auditor
const AcotacionSchema = new mongoose.Schema({
  fecha: String,
  cuenta: String,
  asesor: String,
  emailAsesor: String,
  acotacion: String,
});

// Esquema para el Tracking de Operaciones de Casos
const TrackingDeOperacionesSchema = new mongoose.Schema({
  caso: String,
  seccion: String,
  subseccion: String,
  operacion: String,
  modificacion: String,
  fecha: String,
  cuenta: String,
  asesor: String,
  emailAsesor: String,
  acotacionesAuditor: [AcotacionSchema],
});

export default mongoose.model('TrackingDeOperaciones', TrackingDeOperacionesSchema);
