import VerificationCollection from '../models/VerificationCollection.js';

// Crear un nuevo crédito
export const createCredit = async (req, res) => {

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
    const {
      cuentaVerificador,
      cuentaCobrador,
      cuentaAuditor,
      numeroDePrestamo,
      idDeSubFactura,
      estadoDeCredito,
      nombreDelCliente,
      numeroDeTelefonoMovil,
      clientesNuevo,
      nombreDelProducto,
      fechaDeReembolso,
      fechaDeCreacionDeLaTarea,
      fechaDeTramitacionDelCaso } = req.query;

    // Construcción dinámica del filtro
    const filter = {};
    if (cuentaVerificador) {
      filter.cuentaVerificador = { $regex: cuentaVerificador, $options: "i" };
    }
    if (cuentaCobrador) {
      filter.cuentaCobrador = { $regex: cuentaCobrador, $options: "i" };
    }
    if (cuentaAuditor) {
      filter.cuentaAuditor = { $regex: cuentaAuditor, $options: "i" };
    }
    if (numeroDePrestamo) {
      filter.numeroDePrestamo = { $regex: numeroDePrestamo, $options: "i" };
    }
    if (numeroDePrestamo) {
      filter.numeroDePrestamo = { $regex: numeroDePrestamo, $options: "i" };
    }

    if (idDeSubFactura) {
      filter.idDeSubFactura = { $regex: idDeSubFactura, $options: "i" };
    }
    if (estadoDeCredito) {
      const palabras = estadoDeCredito.split(",").map(palabra => palabra.trim());
      filter.$or = palabras.map(palabra => ({ estadoDeCredito: palabra }));
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
    console.log(cuentaVerificador)

    // Consulta a MongoDB con filtro dinámico
    const credits = await VerificationCollection.find(filter);
    console.log(credits)
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
  console.log("req", req.body)
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










