import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  //Sistema de creacion de cuenta personal
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
  codificacionDeRoles: String,

  // Actualizacion de cuenta personal
  nombreCompleto: String,
  dni: String,
  telefono: String,
  fotoURL: String,

  // Actualizacion de cuenta personal
  cuenta: String,
  apodo: String,

}, {
  timestamps: true,
  collection: 'gestionDeAccesosPersonales'
});

export default mongoose.model('UserPersonal', userSchema);


