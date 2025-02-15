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

// Actualizar contenido de un boletín informativo existente
export const updateNewsletter = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const newsletter = await Newsletter.findById(id);
    if (!newsletter) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }

    newsletter.content = content;
    await newsletter.save();

    res.status(200).json({ message: 'Actualizado exitosamente', newsletter });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar', details: error.message });
  }
};

export const deleteNewsletter = async (req, res) => {
  try {
    const { id } = req.params;
    const newsletter = await Newsletter.findByIdAndDelete(id);
    if (!newsletter) {
      return res.status(400).json({ message: "Documento no encontrado" });
    }
    return res.status(200).json({ message: "Documento eliminado correctamente" })
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el documento", error: error.message });
  }
}

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