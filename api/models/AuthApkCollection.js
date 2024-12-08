import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombres: {
    type: String,
    required: true,
    minlength: 3
  },
  apellidos: {
    type: String,
    required: true,
    minlength: 3
  },
  fechaDeNacimiento: {
    type: String,
    required: true,
    minlength: 3  },
  sexo: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true
  },

  refUnoNombres:{
    type: String,
  },
  refUnoRelacion:{
    type: String,
  },
  refUnoTelefono:{
    type: String,
  },
  refDosNombres:{
    type: String,
  },
  refDosRelacion:{
    type: String,
  },
  refDosTelefono:{
    type: String,
  },


  imgFrontalCedula:{
    type: String,
  },
  imgReversoCedula:{
    type: String,
  },
  numeroDeCedula:{
    type: String,
  },
  fotografia: {
    type: String,
  },


  metodoParaRecibirElPrestamo: {
    type: String,
  },
  nombreDelBanco: {
    type: String,
  },
  tipoDeCuenta: {
    type: String,
  },
  cuentaBancaria: {
    type: String,        
  },
  numeroDeDocumentoDeIdentidad: {
    type: String,
  },


  codificacionDeRoles: {
    type: String,
    required: true,
    minlength: 3
  },
}, {
  timestamps: true,
  collection: 'accesosApk'

});

export default mongoose.model('UserApk', userSchema);


