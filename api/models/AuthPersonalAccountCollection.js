import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  codificacionDeRoles: {
    type: String,
    minlength: 3
  },
  rolAsignado: {
    type: String,
    minlength: 3
  },
  nombreCompleto: {
    type: String,
  },
  dni: {
    type: String,
  },
  telefono: {
    type: String,
  },
  cuenta: {
    type: String,
  },
  apodo: {
    type: String,
  },

}, {
  timestamps: true,
  collection: 'gestionDeAccesosPersonales'

});

export default mongoose.model('UserPersonal', userSchema);


