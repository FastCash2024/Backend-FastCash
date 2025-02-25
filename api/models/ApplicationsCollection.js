import mongoose from 'mongoose';

const tipoApplicationSchema = new mongoose.Schema({
  valorPrestadoMasInteres: {
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
  // categoria: {
  //   type: String,
  // },
  nivelDePrestamo: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
  _id: false,
});

tipoApplicationSchema.pre('save', function (next) {
  const application = this;
  const niveles = application.get('niveles') || [];

  const nivelesUnicos = new Set(niveles.map(nivel => nivel.nivelDePrestamo));
  if (nivelesUnicos.size !== niveles.length) {
    return next(new Error('Las categorías no pueden ser duplicadas dentro de un mismo tipo de aplicación'));
  }

  next();
});

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
  },
  calificacion: {
    type: String,
  },
  icon: {
    type: String
  },
  prestamoMaximo: String,
  interesDiarioMaximo: String,
  niveles: [tipoApplicationSchema],
}, {
  timestamps: true,
  collection: 'aplicaciones'

});

export default mongoose.model('Application', userSchema);


