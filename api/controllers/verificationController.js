import VerificationCollection from '../models/VerificationCollection.js';

// Crear un nuevo crédito
export const createCredit = async (req, res) => {
  console.log('Request size:', req.headers['content-length']);

  try {
    console.log(req.body)
    const newCredit = new VerificationCollection(req.body);
    const savedCredit = await newCredit.save();
    res.status(201).json(savedCredit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los créditos
export const getAllCredits = async (req, res) => {
  try {
    const { numeroDePrestamo, idDeSubFactura, estadoDeCredito, nombreDelCliente, numeroDeTelefonoMovil, clientesNuevo, nombreDelProducto, fechaDeReembolso, fechaDeCreacionDeLaTarea, fechaDeTramitacionDelCaso } = req.query;
    // Construcción dinámica del filtro
    const filter = {};

    if (numeroDePrestamo) {
      filter.numeroDePrestamo = { $regex: numeroDePrestamo, $options: "i" };
    }

    if (idDeSubFactura) {
      filter.idDeSubFactura = { $regex: idDeSubFactura, $options: "i" };
    }
    if (estadoDeCredito) {
      filter.estadoDeCredito = { $regex: estadoDeCredito, $options: "i" };
    }
    if (nombreDelCliente) {
      filter.nombreDelCliente = { $regex: nombreDelCliente, $options: "i" };
    }

    if (numeroDeTelefonoMovil) {
      filter.numeroDeTelefonoMovil = { $regex: numeroDeTelefonoMovil, $options: "i" };
    }

    if (clientesNuevo) {
      filter.clientesNuevo = clientesNuevo === "true"; // Convertir a booleano
    }

    if (nombreDelProducto) {
      filter.nombreDelProducto = { $regex: nombreDelProducto, $options: "i" };
    }

    if (fechaDeReembolso || fechaDeCreacionDeLaTarea || fechaDeTramitacionDelCaso) {
      filter.fecha = {};
      if (fechaDeReembolso) filter.fechaDeReembolso = new Date(fechaDeReembolso);
      if (fechaDeCreacionDeLaTarea) filter.fechaDeCreacionDeLaTarea = new Date(fechaDeCreacionDeLaTarea);
      if (fechaDeTramitacionDelCaso) filter.fechaDeTramitacionDelCaso = new Date(fechaDeTramitacionDelCaso);
    }

    // Consulta a MongoDB con filtro dinámico
    const credits = await VerificationCollection.find(filter);

    res.json(credits);
  } catch (error) {
    console.error("Error al obtener créditos:", error);
    res.status(500).json({ message: "Error al obtener los créditos." });
  }
};


// Obtener un crédito por ID
export const getCreditById = async (req, res) => {
  try {
    const credit = await VerificationCollection.findById(req.params.id);
    if (!credit) return res.status(404).json({ message: 'Crédito no encontrado' });
    res.json(credit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un crédito
export const updateCredit = async (req, res) => {
  try {
    const updatedCredit = await VerificationCollection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCredit) return res.status(404).json({ message: 'Crédito no encontrado' });
    res.json(updatedCredit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un crédito
export const deleteCredit = async (req, res) => {
  try {
    const deletedCredit = await VerificationCollection.findByIdAndDelete(req.params.id);
    if (!deletedCredit) return res.status(404).json({ message: 'Crédito no encontrado' });
    res.json({ message: 'Crédito eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};















// import Credit from '../models/VerificationCollection.js';

// // Crear un nuevo crédito
// export const createCredit = async (req, res) => {
//   try {
//     const newCredit = new Credit(req.body);
//     const savedCredit = await newCredit.save();
//     res.status(201).json(savedCredit);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Obtener todos los créditos
// export const getAllCredits = async (req, res) => {
//   try {
//     const credits = await Credit.find();
//     res.json(credits);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Obtener un crédito por ID
// export const getCreditById = async (req, res) => {
//   try {
//     const credit = await Credit.findById(req.params.id);
//     if (!credit) return res.status(404).json({ message: 'Crédito no encontrado' });
//     res.json(credit);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Actualizar un crédito
// export const updateCredit = async (req, res) => {
//   try {
//     const updatedCredit = await Credit.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedCredit) return res.status(404).json({ message: 'Crédito no encontrado' });
//     res.json(updatedCredit);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Eliminar un crédito
// export const deleteCredit = async (req, res) => {
//   try {
//     const deletedCredit = await Credit.findByIdAndDelete(req.params.id);
//     if (!deletedCredit) return res.status(404).json({ message: 'Crédito no encontrado' });
//     res.json({ message: 'Crédito eliminado exitosamente' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };










