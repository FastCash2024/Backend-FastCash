import mongoose from 'mongoose';

// Esquema para el Tracking de Operaciones de Casos
const TrackingDeOperacionesSchema = new mongoose.Schema({
  descripcionDeExcepcion: String,
  nomenclatura: String,
  cuentaOperadora: String,
  cuentaPersonal: String,
  codigoDeSistema: String,
  codigoDeOperacion: String, 
  contenidoDeOperacion: String,
  fechaDeOperacion: String,
  caso: String 
});


export default mongoose.model('TrackingDeOperaciones', TrackingDeOperacionesSchema);
