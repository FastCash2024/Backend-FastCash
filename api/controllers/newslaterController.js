import Newsletter from '../models/newsletterModel.js';

// Guardar contenido de ReactQuill en MongoDB
export const writeNewsletter = async (req, res) => {
  console.log(req)
  try {
    const { content } = req.body;
    const newsletter = new Newsletter({ content });
    await newsletter.save();
    res.status(201).json({ message: 'Guardado exitosamente', newsletter });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar' });
  }
};

// Leer el último contenido guardado
export const readNewsletter = async (req, res) => {
  console.log(req)
  try {
    const newsletters = await Newsletter.find().sort({ createdAt: -1 }); // Obtener todos los newsletters, ordenados por `createdAt` en orden descendente
    res.status(200).json(newsletters);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer' });
  }
};



// // Mandar las categorias de prestamos


// // 1) el backend deberia validar en login al usuario y en funcion a eso mandar las categorias de prestamo junto con el nivel correpondiente




// // Frontend y backend guardar datos
// aplicaciones = {
//   nivelDePrestamo: "1",
// }



// // Frontend y backend guardar datos Ivan
// usuariosAPK
// nombreDeNivelDePrestamo="fastCash01"
// nivelDePrestamo="1"
// estadoDeNivelDePrestamo="Pagado"








// const datosDeNivelDeprestamo = {
// nivelDePrestamo:"fastCash01",
// estadoDeNivelDePrestamo:"Pagado"
// }


// const historialDePrestamos = {
// fastCash01: "Pagado",
// fastCash02: "Pagado",
// fastCash03: "Pendiente",
// }