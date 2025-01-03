import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 3
  },
  prestamoMaximo: {
    type: String,
    required: true,
    minlength: 3
  },
  interesDiario: {
    type: String,
    required: true,
    minlength: 1  
},
  calificacion: {
    type: String,
    required: true,
    minlength: 3
  },
  icon: {
    type: String,
    required: true,
    minlength: 3
  },
  categoria: {
    type: String,
    required: true,
    minlength: 3
  },
}, {
  timestamps: true,
  collection: 'aplicaciones'

});

export default mongoose.model('Application', userSchema);


