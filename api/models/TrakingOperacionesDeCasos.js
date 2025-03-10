import mongoose from 'mongoose';

// Esquema para el Tracking de Operaciones de Casos
const TrackingDeOperacionesSchema = new mongoose.Schema({
  subID: {
    type: String,
    required: false // Hacer que subID sea opcional
  },
  descripcionDeExcepcion: {
    type: String,
    required: true
  },
  cuentaOperadora: {
    type: String,
    required: true
  },
  cuentaPersonal: {
    type: String,
    required: true
  },
  codigoDeSistema: {
    type: String,
    required: true
  },
  codigoDeOperacion: {
    type: String,
    required: true
  },
  contenidoDeOperacion: {
    type: String,
    required: true
  },
  fechaDeOperacion: {
    type: String,
    required: true
  }
});


export default mongoose.model('TrackingDeOperaciones', TrackingDeOperacionesSchema);
