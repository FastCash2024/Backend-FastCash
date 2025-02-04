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
  categoria: {
    type: String,
  },
  tipo: {
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
  const tipos = application.get('tipos') || [];  // Asegurarse de que 'tipos' sea un arreglo, incluso si es undefined.

  const tiposUnicos = new Set(tipos.map(tipo => tipo.tipo));  // Ahora no debería lanzar un error si 'tipos' es undefined
  if (tiposUnicos.size !== tipos.length) {
    return next(new Error('Las categorías no pueden ser duplicadas dentro de un mismo tipo de aplicación'));
  }

  next();
});

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
  tipos: [tipoApplicationSchema],
}, {
  timestamps: true,
  collection: 'aplicaciones'

});

export default mongoose.model('Application', userSchema);


