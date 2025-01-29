import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
  },
  valorPrestado: {
    type: String,
  },
  valorDepositoLiquido: {
    type: String,
  },
  interesTotal: {
    type: String,
  },
  interesDiario: {
    type: String,
  },
  valorPrestamoMenosInteres: {
    type: String,
  },
  valorExtencion: {
    type: String,
  },
  calificacion: {
    type: String,
  },
  icon: {
    type: String
  },
  categoria: {
    type: String,

  },
}, {
  timestamps: true,
  collection: 'aplicaciones'

});

export default mongoose.model('Application', userSchema);


