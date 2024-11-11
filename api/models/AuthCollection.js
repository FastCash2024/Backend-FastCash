import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  origenDeLaCuenta: {
    type: String,
    required: true,
    minlength: 3
  },
  tipoDeGrupo: {
    type: String,
    required: true,
    minlength: 3
  },
  codificacionDeRoles: {
    type: String,
    required: true,
    minlength: 3
  },
  apodo: {
    type: String,
  },
  cuenta: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true
  },
  cuentaPersonal:{
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  situacionLaboral: {
    type: String,
    required: true,
    minlength: 3
  }
}, {
  timestamps: true,
  collection: 'gestionDeAccesos'

});

export default mongoose.model('User', userSchema);


