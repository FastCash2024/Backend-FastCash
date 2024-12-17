import mongoose from 'mongoose';
//MODELO DE CUENTAS DE ADMINISTRACION
const userSchema = new mongoose.Schema({
  //DATOS DE CUENTA
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
  situacionLaboral: {
    type: String,
    required: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },  
  //DATOS DE CUENTA PERSONAL ASIGNADA
  nombrePersonal: {
    type: String,
  },
  emailPersonal: {
    type: String, 
    lowercase: true
  },
}, {
  timestamps: true,
  collection: 'gestionDeAccesos'

});

export default mongoose.model('User', userSchema);


