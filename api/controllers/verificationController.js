import { LogContextImpl } from 'twilio/lib/rest/serverless/v1/service/environment/log.js';
import VerificationCollection from '../models/VerificationCollection.js';
import moment from 'moment';

function generarSecuencia(count) {
  let base = 15 + Math.floor(Math.floor(count / 999999)) * 1;
  let numero = count <= 999999 ? count + 1 : 1;
  // Función que genera el número en el formato deseado
  const secuencia = `${base}${String(numero).padStart(6, '0')}`;
  return secuencia;
}

// Crear un nuevo crédito
export const createCredit = async (req, res) => {
  const count = await VerificationCollection.countDocuments();
  const generador = generarSecuencia(count);
  try {
    console.log(req.body)
    const newData = {
      ...req.body,
      numeroDePrestamo: generador
    }
    const newCredit = new VerificationCollection(newData);
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
      fechaDeTramitacionDelCaso,
      limit = 5,
      page = 1
    } = req.query;

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
    if (idDeSubFactura) {
      filter.idDeSubFactura = { $regex: idDeSubFactura, $options: "i" };
    }

    console.log("estadoDeCredito DESDE LA URL", estadoDeCredito);

    if (estadoDeCredito) {
      const palabras = estadoDeCredito.split(/[,?]/).map(palabra => palabra.trim());
      filter.estadoDeCredito = palabras;
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
      // filter.fecha = {};
      if (fechaDeReembolso) filter.fechaDeReembolso = new Date(fechaDeReembolso).toISOString().split('T')[0];
      if (fechaDeCreacionDeLaTarea) filter.fechaDeCreacionDeLaTarea = new Date(fechaDeCreacionDeLaTarea).toISOString().split('T')[0];
      if (fechaDeTramitacionDelCaso) filter.fechaDeTramitacionDelCaso = new Date(fechaDeTramitacionDelCaso).toISOString().split('T')[0];
    }

    console.log("filter", filter);


    // obtener el total de documentos
    const totalDocuments = await VerificationCollection.countDocuments(filter);

    console.log("totalDocuments", totalDocuments);

    // calcular el total de pagianas
    const totalPages = Math.ceil(totalDocuments / limit);
    // Consulta a MongoDB con filtro
    const credits = await VerificationCollection.find(filter)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    console.log(fechaDeReembolso);

    res.json({
      data: credits,
      currentPage: parseInt(page),
      totalPages,
      totalDocuments,
    });
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

// Obtener un crédito por número de teléfono
export const getCreditByPhone = async (req, res) => {
  try {
    const numeroDeTelefonoMovil = req.query.numeroDeTelefonoMovil;
    console.log("numeroDeTelefonoMovil", numeroDeTelefonoMovil);

    if (!numeroDeTelefonoMovil) return res.status(404).json({ message: 'Número de teléfono no proporcionado' });

    // Filtrar por número de teléfono
    const filter = {
      numeroDeTelefonoMovil: { $regex: numeroDeTelefonoMovil, $options: "i" } // Se busca en el campo correcto
    };

    // Buscar el crédito que coincida con el número de teléfono
    const response = await VerificationCollection.find(filter);

    if (!response || response.length === 0) {
      return res.status(404).json({ message: 'Crédito no encontrado' });
    }

    res.json(response);
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


// Función para obtener el conteo total de documentos en la colección
export const getVerificationCount = async (req, res) => {
  try {
    // Usando Mongoose:
    const count = await VerificationCollection.countDocuments();

    res.json({ collectionCount: count });
  } catch (error) {
    console.error('Error al contar documentos:', error);
    res.status(500).json({ message: 'Error al contar los documentos' });
  }
}

// export const getCustomers = async (req, res) => {
//   try {
//     const result = await VerificationCollection.distinct("nombreDeLaEmpresa");
//     console.log("result", result);
//     res.json(result);
//   } catch (error) {
//     console.error("Error al obtener el flujo de clientes:", error);
//     res.status(500).json({ message: "Error al obtener el flujo de clientes." });

//   }
// }

export const getCustomerFlow = async (req, res) => {
  try {
    const { fechaDeReembolso } = req.query;

    if (!fechaDeReembolso) {
      return res.status(400).json({ message: "Faltan parámetros requeridos" });
    }

    const fechaFormateada = new Date(fechaDeReembolso).toISOString().split('T')[0];

    const filter = {
      fechaDeReembolso: { $regex: fechaFormateada, $options: "i" }
    };

    const result = await VerificationCollection.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            nombreDeLaEmpresa: "$nombreDeLaEmpresa",
            fechaDeReembolso: { $substr: ["$fechaDeReembolso", 0, 10] }
          },
          total: { $sum: 1 },
          totalCobrado: {
            $sum: {
              $cond: [{ $eq: ["$estadoDeCredito", "Cobrado"] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          nombreDeLaEmpresa: "$_id.nombreDeLaEmpresa",
          fechaDeReembolso: "$_id.fechaDeReembolso",
          total: 1,
          totalCobrado: 1
        }
      }
    ]);


    // Transformar el resultado en el formato deseado
    const formattedResult = result.reduce((acc, item) => {
      acc[item.nombreDeLaEmpresa] = {
        total: item.total,
        totalCobrado: item.totalCobrado,
        fechaDeReembolso: item.fechaDeReembolso
      };
      return acc;
    }, {});

    res.json(formattedResult);
  } catch (error) {
    console.error("Error al obtener el flujo de clientes:", error);
    res.status(500).json({ message: "Error al obtener el flujo de clientes." });
  }
};

export const getReporteDiario = async (req, res) => {
  try {
    const { fecha, estadoDeCredito } = req.query;
    const today = fecha || moment().format('DD/MM/YYYY');

    // Filtro para comparar la fecha formateada con el formato "DD/MM/YYYY"
    const filter = {
      $expr: {
        $eq: [
          {
            $dateToString: {
              format: '%d/%m/%Y',
              date: { $toDate: '$fechaDeTramitacionDelCaso' },
            },
          },
          today,
        ],
      },
    };

    if (estadoDeCredito) {
      const palabras = estadoDeCredito.split(/[,?]/).map((palabra) => palabra.trim());
      filter.estadoDeCredito = { $in: palabras };
    }

    const casosDelDia = await VerificationCollection.find(filter);

    if (casosDelDia.length === 0) {
      return res.json({
        data: {},
        message: `No se encontraron casos del día ${today} con el estado ${estadoDeCredito || 'N/A'}.`,
      });
    }

    const resultado = {};

    casosDelDia.forEach((caso) => {
      const tipo = caso.cuentaVerificador || 'Desconocido';

      if (!resultado[tipo]) {
        resultado[tipo] = {
          aprobados10am: 0,
          reprobados10am: 0,
          aprobados12am: 0,
          reprobados12am: 0,
          aprobados14pm: 0,
          reprobados14pm: 0,
          aprobados16pm: 0,
          reprobados16pm: 0,
          aprobadosTotal: 0,
          reprobadosTotal: 0,
        };
      }

      const hora = new Date(caso.fechaDeTramitacionDelCaso).getUTCHours();

      if (caso.estadoDeCredito === 'Aprobado') {
        if (hora <= 10) resultado[tipo].aprobados10am += 1;
        if (hora > 10 && hora <= 12) resultado[tipo].aprobados12am += 1;
        if (hora > 12 && hora <= 14) resultado[tipo].aprobados14pm += 1;
        if (hora > 14 && hora <= 16) resultado[tipo].aprobados16pm += 1;
        resultado[tipo].aprobadosTotal += 1; // Ajustado el cálculo correcto
      } else if (caso.estadoDeCredito === 'Reprobado') {
        if (hora <= 10) resultado[tipo].reprobados10am += 1;
        if (hora > 10 && hora <= 12) resultado[tipo].reprobados12am += 1;
        if (hora > 12 && hora <= 14) resultado[tipo].reprobados14pm += 1;
        if (hora > 14 && hora <= 16) resultado[tipo].reprobados16pm += 1;
        resultado[tipo].reprobadosTotal += 1; // Ajustado el cálculo correcto
      }
    });

    res.json({ data: resultado });
  } catch (error) {
    console.error('Error al obtener el reporte diario:', error);
    res.status(500).json({ message: 'Error al obtener los datos' });
  }
};


export const getReporteCDiario = async (req, res) => {
  try {
    const { fecha, estadoDeCredito } = req.query;
    const today = fecha || moment().format('DD/MM/YYYY'); // Fecha actual en formato 'DD/MM/YYYY'

    const filter = {
      $expr: {
        $eq: [
          {
            $dateToString: {
              format: '%d/%m/%Y',
              date: { $toDate: '$fechaDeReembolso' },
            },
          },
          today,
        ],
      },
    };

    if (estadoDeCredito) {
      const palabras = estadoDeCredito.split(/[,?]/).map((palabra) => palabra.trim());
      filter.estadoDeCredito = { $in: palabras };
    }

    const casosDelDia = await VerificationCollection.find(filter);

    if (casosDelDia.length === 0) {
      return res.json({
        data: {},
        message: `No se encontraron casos del día ${today} con el estado ${estadoDeCredito || 'Pagado'}.`,
      });
    }

    const resultado = {};

    casosDelDia.forEach((caso) => {
      const tipo = caso.cuentaCobrador || 'Desconocido'; // Agrupar por cuentaCobrador o similar
      if (!resultado[tipo]) {
        resultado[tipo] = {
          pagos10am: 0,
          ptp10am: 0,
          tasaRecuperacion10am: 0,
          pagos12am: 0,
          ptp12am: 0,
          tasaRecuperacion12am: 0,
          pagos2pm: 0,
          ptp2pm: 0,
          tasaRecuperacion2pm: 0,
          pagos4pm: 0,
          ptp4pm: 0,
          tasaRecuperacion4pm: 0,
          pagos6pm: 0,
          ptp6pm: 0,
          tasaRecuperacion6pm: 0,
          pagosTotal: 0,
          tasaRecuperacionTotal: 0,
        };
      }

      const hora = new Date(caso.fechaDeReembolso).getHours();

      if (caso.estadoDeCredito === 'Pagado') {
        if (hora <= 10) resultado[tipo].pagos10am += 1;
        if (hora > 10 && hora <= 12) resultado[tipo].pagos12am += 1;
        if (hora > 12 && hora <= 14) resultado[tipo].pagos2pm += 1;
        if (hora > 14 && hora <= 16) resultado[tipo].pagos4pm += 1;
        if (hora > 16 && hora <= 18) resultado[tipo].pagos6pm += 1;
        resultado[tipo].pagosTotal += 1;
      } else if (caso.estadoDeCredito === 'PTP') {
        if (hora <= 10) resultado[tipo].ptp10am += 1;
        if (hora > 10 && hora <= 12) resultado[tipo].ptp12am += 1;
        if (hora > 12 && hora <= 14) resultado[tipo].ptp2pm += 1;
        if (hora > 14 && hora <= 16) resultado[tipo].ptp4pm += 1;
        if (hora > 16 && hora <= 18) resultado[tipo].ptp6pm += 1;
      }
    });

    // Calcular tasas de recuperación por tipo
    Object.keys(resultado).forEach((tipo) => {
      const data = resultado[tipo];
      data.tasaRecuperacion10am = data.pagos10am / (data.ptp10am || 1);
      data.tasaRecuperacion12am = data.pagos12am / (data.ptp12am || 1);
      data.tasaRecuperacion2pm = data.pagos2pm / (data.ptp2pm || 1);
      data.tasaRecuperacion4pm = data.pagos4pm / (data.ptp4pm || 1);
      data.tasaRecuperacion6pm = data.pagos6pm / (data.ptp6pm || 1);
      data.tasaRecuperacionTotal =
        data.pagosTotal /
        (data.ptp10am + data.ptp12am + data.ptp2pm + data.ptp4pm + data.ptp6pm || 1);
    });

    res.json({ data: resultado });
  } catch (error) {
    console.error('Error al obtener los datos de reembolso:', error);
    res.status(500).json({ message: 'Error al obtener los datos' });
  }
};

