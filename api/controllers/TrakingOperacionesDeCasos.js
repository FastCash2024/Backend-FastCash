import TrakingOperacionesDeCasos from '../models/TrakingOperacionesDeCasos.js';

export const createTrackings = async (req, res) => {
  try {
    const {
      descripcionDeExcepcion,
      cuentaOperadora,
      cuentaPersonal,
      codigoDeSistema,
      codigoDeOperacion,
      contenidoDeOperacion,
      fechaDeOperacion,
      subID // subID es opcional
    } = req.body;

    const requiredFields = [
      'descripcionDeExcepcion',
      'cuentaOperadora',
      'cuentaPersonal',
      'codigoDeSistema',
      'codigoDeOperacion',
      'contenidoDeOperacion',
      'fechaDeOperacion'
    ];

    // Verificar que todos los campos obligatorios estén presentes
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Faltan campos obligatorios: ${missingFields.join(', ')}` });
    }

    // Crear el nuevo tracking con los datos validados
    const newTracking = new TrakingOperacionesDeCasos({
      descripcionDeExcepcion,
      cuentaOperadora,
      cuentaPersonal,
      codigoDeSistema,
      codigoDeOperacion,
      contenidoDeOperacion,
      fechaDeOperacion,
      subID 
    });

    await newTracking.save();
    res.status(201).json({ message: "Registro creado exitosamente", data: newTracking });
  } catch (error) {
    console.error("Error al crear el tracking:", error);
    res.status(500).json({ message: "Error al crear el registro.", details: error.message });
  }
};


export const createTracking = async (tracking) => {
  try {
    const newTracking = new TrakingOperacionesDeCasos(tracking);
    await newTracking.save();
    return "Tracking registrado";
  } catch (error) {
    console.error("Error al crear el tracking:", error);
    return `Error al crear el tracking: ${error.message}`;
  }
};



export const getTrackings = async (req, res) => {
  try {
    const { caso, asesor, cuenta, fecha, limit = 10, page = 1 } = req.query;

    const filter = {};
    if (asesor) filter.asesor = { $regex: asesor, $options: "i" };
    if (cuenta) filter.cuenta = { $regex: cuenta, $options: "i" };
    if (caso) {
      filter.numeroDePrestamo = { $regex: caso, $options: "i" };
    }

    if (fecha) filter.fecha = fecha;

    const totalDocuments = await TrakingOperacionesDeCasos.countDocuments(filter);
    const totalPages = Math.ceil(totalDocuments / limit);

    const records = await TrakingOperacionesDeCasos.find(filter)
      .sort({ _id: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.json({
      data: records,
      currentPage: parseInt(page),
      totalPages,
      totalDocuments,
    });
  } catch (error) {
    console.error("Error al obtener tracking:", error);
    res.status(500).json({ message: "Error al obtener los registros." });
  }
};


export const updateTrackingById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedTracking = await TrakingOperacionesDeCasos.findByIdAndUpdate(
      id,
      { $set: updateData }, // Se actualizan los campos enviados
      { new: true, runValidators: true }
    );

    if (!updatedTracking) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro actualizado correctamente", data: updatedTracking });
  } catch (error) {
    console.error("Error al actualizar tracking:", error);
    res.status(500).json({ message: "Error al actualizar el registro." });
  }
};
