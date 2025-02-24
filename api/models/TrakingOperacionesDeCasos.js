import mongoose from 'mongoose';

// Esquema para el Tracking de Operaciones de Casos
const TrackingDeOperacionesSchema = new mongoose.Schema({
  caso: String,
  seccion: String,
  subID: String,
  
  codigoDeOperacion: String,
  codigoDeProducto: String,
  operacion: String,
  modificacion: String,
  fecha: String,
  cuenta: String,
  asesor: String,
  emailAsesor: String,
  acotacion: String
});


export default mongoose.model('TrackingDeOperaciones', TrackingDeOperacionesSchema);
