import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  content: String, // Almacena el HTML generado por ReactQuill
}, { timestamps: true }); // Agrega campos 'createdAt' y 'updatedAt'

const Newsletter = mongoose.model('newsletter', newsletterSchema);

export default Newsletter;

