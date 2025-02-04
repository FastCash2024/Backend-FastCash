import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
    originalName: String,
    savedAs: String,
    mimeType: String,
    size: Number,
    path: String
});

const CuentasBancariasSchema = new mongoose.Schema({
    nombreDeBanco: String,
    numeroDeCuenta: String,
    estadoDeCuenta: {
      type: String,
      enum: ['Activo', 'Bloqueado'],
      default: 'Activo',
    },
    acotacion: String,
  });

const FormSchema = new mongoose.Schema({
    celular: String,
    formData: Object, // Puedes ajustar este tipo según los campos de tu formulario
    images: [String],
    cuentasBancarias: [CuentasBancariasSchema],
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true,
    collection: 'usuariosApk'
});

export const FormModel = mongoose.model('usuariosApk', FormSchema);



// import mongoose from 'mongoose';

// const fileSchema = new mongoose.Schema({
//     originalName: { type: String, required: true },
//     savedAs: { type: String, required: true },
//     mimeType: { type: String, required: true },
//     size: { type: Number, required: true },
//     uploadedAt: { type: Date, default: Date.now }
// });

// const File = mongoose.model('File', fileSchema);

// module.exports = File;
