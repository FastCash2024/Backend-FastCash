
import { FormModel } from '../models/FormModel.js'; // Asegúrate de usar la ruta correcta
import Application from '../models/ApplicationsCollection.js';
import { verificarOTP } from './uploadControllerS3.js';
import VerificationCollection from '../models/VerificationCollection.js';

// Obtener todos los usuarios
export const getFilterUsers = async (req, res) => {
  try {
    const { phoneNumber } = req.query;
    // Validación de phoneNumber
    if (phoneNumber && typeof phoneNumber !== "string") {
      return res.status(400).json({ message: "El campo phoneNumber debe ser un string válido." });
    }
    // Construcción dinámica del filtro
    const filter = {};
    if (phoneNumber) {
      // Buscar dentro de formData usando la notación de punto
      filter["formData.phoneNumber"] = { $regex: phoneNumber, $options: "i" }; // Insensible a mayúsculas
    }
    // Consulta a MongoDB con filtro dinámico
    const users = await FormModel.find(filter);
    // Respuesta
    if (users.length === 0) {
      return res.status(404).json({ message: "No se encontraron usuarios que coincidan con el filtro." });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Ocurrió un error al obtener los usuarios.", error: error.message });
  }
};

// Obtener todos los usuarios
export const getFilterUsersApk = async (req, res) => {
  console.log(req)
  try {
    const { phoneNumber, codigo } = req.query;
    console.log(phoneNumber)
    const otpResult = await verificarOTP(phoneNumber, codigo);
    if (!otpResult.success) {
      return res.status(400).json({ error: otpResult.error });
    }
    // // Validación de phoneNumber
    // if (phoneNumber && typeof phoneNumber !== "string") {
    //   return res.status(400).json({ message: "El campo phoneNumber debe ser un string válido." });
    // }
    // Construcción dinámica del filtro
    const filter = {};
    if (phoneNumber) {
      // Buscar dentro de formData usando la notación de punto
      filter["formData.contacto"] = { $regex: phoneNumber, $options: "i" }; // Insensible a mayúsculas
    }
    // Consulta a MongoDB con filtro dinámico
    const users = await FormModel.find(filter);
    console.log(phoneNumber)
    console.log(users)
    // Respuesta
    if (users.length === 0) {
      return res.status(404).json({ message: "No se encontraron usuarios que coincidan con el filtro." });
    }
    if (users.length > 1) {
      return res.status(204).json({ message: "Many Accounts" });
    }
    if (users.length === 1) {
      const formData = { ...users[0].formData }
      delete formData['contactos']
      delete formData['sms']
      const resultAplication = await getApplications(formData)
      console.log("resultado aplicacion: ", resultAplication);
      const dataRes = {
        userID: users[0].id,
        ...formData,
        applications: resultAplication,
      }
      return res.json(dataRes);
      ;
    }
    return res.status(404).json({ message: "non exist" });
  } catch (error) {
    res.status(500).json({ message: "Ocurrió un error al obtener los usuarios.", error: error.message });
  }
};
// Obtener todos los usuarios
export const getFilterUsersApkFromWeb = async (req, res) => {
  console.log(req)
  try {
    const { phoneNumber } = req.query;

    // Construcción dinámica del filtro
    const filter = {};
    if (phoneNumber) {
      // Buscar dentro de formData usando la notación de punto
      filter["formData.contacto"] = { $regex: phoneNumber, $options: "i" }; // Insensible a mayúsculas
    }

    // Consulta a MongoDB con filtro dinámico
    const users = await FormModel.find(filter);
    // console.log(phoneNumber)
    // console.log(users)

    // Respuesta
    if (users.length === 0) {
      return res.status(404).json({ message: "No se encontraron usuarios que coincidan con el filtro de contacto." });
    }
    if (users.length > 1) {

      return res.status(204).json({ message: "Many Accounts" });

    }
    if (users.length === 1) {
      const formData = { ...users[0].formData, photoURLs: [...users[0].images.map((image) => `https://api.fastcash-mx.com/${image.path}`)] }
      delete formData['contactos']
      delete formData['sms']


      const dataRes = {
        userID: users[0].id,
        ...formData
      }
      return res.json(dataRes);
      ;
    }
    return res.status(404).json({ message: "non exist" });

  } catch (error) {
    res.status(500).json({ message: "Ocurrió un error al obtener los usuarios.", error: error.message });
  }
};
// Registro de usuario
export const signin = async (req, res) => {
};

// Login de usuario
export const login = async (req, res) => {
};

export const getChatsUser = async (req, res) => {
  try {
    const {
      nombreCompleto,
      limit = 5,
      page = 1
    } = req.query;

    const filter = {};

    if (nombreCompleto) {
      const regex = new RegExp(nombreCompleto, "i");
      const [nombre, apellido] = nombreCompleto.split(" ");

      if (!apellido) {
        filter.$or = [
          { "formData.nombres": regex },
          { "formData.apellidos": regex },
        ];
      } else {
        filter.$and = [
          { "formData.nombres": new RegExp(nombre, "i") },
          { "formData.apellidos": new RegExp(apellido, "i") },
        ];
      }
    }


    const forms = await FormModel.find(filter, 'formData.nombres formData.apellidos formData.contacto formData.sms')
      .skip((parseInt(page) - 1) * parseInt(limit))  // Paginación
      .limit(parseInt(limit));  // Límite

    const totalDocuments = await FormModel.countDocuments(filter);

    const totalPages = Math.ceil(totalDocuments / limit);

    const result = forms.map(form => {
      const { nombres, apellidos, contacto, sms } = form.formData;
      return {
        _id: form._id,
        nombreCompleto: `${nombres} ${apellidos}`,
        contacto,
        cantidadSms: sms?.length
      };
    });

    res.status(200).json({
      data: result,
      currentPage: parseInt(page),
      totalPages,
      totalDocuments,
    });
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({
      error: "Error al obtener los los usuarios",
      details: error.message,
    });
  }
};

export const getApplications = async (userData) => {
  try {
    const { numeroDeTelefono, dni, nombreDelCliente, nombreDelProducto } = userData;

    // Buscar préstamos en VerificationCollection según los parámetros dados
    const userLoans = await VerificationCollection.find({
      numeroDeTelefonoMovil: numeroDeTelefono,
      nombreDelCliente,
      nombreDelProducto,
      dni
    });

    // Buscar todas las aplicaciones
    const applications = await Application.find();

    // Si el usuario tiene un préstamo en estado "Dispersado", bloquear todas las apps
    const tieneCreditoDispersado = userLoans.some(loan => loan.estadoDeCredito === "Dispersado");
    if (tieneCreditoDispersado) {
      return applications.map(app => ({
        nombre: app.nombre,
        icon: app.icon,
        calificacion: app.calificacion,
        estadoDeNivel: "No disponible"
      }));
    }

    // Si solo tiene créditos en "Pagado" o "Pagado con extensión", buscar el siguiente nivel
    const ultimoPrestamo = userLoans.sort((a, b) => parseFloat(b.nivel) - parseFloat(a.nivel))[0];

    return applications.map(app => {
      const nivelesOrdenados = app.niveles.sort((a, b) => parseFloat(a.nivelDePrestamo) - parseFloat(b.nivelDePrestamo));
      let nivelCorrespondiente = nivelesOrdenados[0]; // Por defecto, nivel 1

      if (ultimoPrestamo && app.nombre === ultimoPrestamo.nombreDelProducto) {
        const nivelIndex = nivelesOrdenados.findIndex(n => n.nivelDePrestamo === ultimoPrestamo.nivel);
        if (nivelIndex !== -1 && nivelIndex + 1 < nivelesOrdenados.length) {
          nivelCorrespondiente = nivelesOrdenados[nivelIndex + 1];
        }
      }

      return {
        nombre: app.nombre,
        icon: app.icon,
        calificacion: app.calificacion,
        PrestamoMaximo: nivelesOrdenados[nivelesOrdenados.length - 1].valorPrestadoMasInteres,
        interesDiarioMaximo: nivelesOrdenados[nivelesOrdenados.length - 1].interesDiario,
        interesDiario: nivelCorrespondiente.interesDiario,
        interesTotal: nivelCorrespondiente.interesTotal,
        valorDepositoLiquido: nivelCorrespondiente.valorDepositoLiquido,
        valorExtencion: nivelCorrespondiente.valorExtencion,
        valorPrestado: nivelCorrespondiente.valorPrestadoMasInteres,
        valorPrestamoMenosInteres: nivelCorrespondiente.valorPrestamoMenosInteres,
        estadoDeNivel: "Disponible",
        nivelDePrestamo: nivelCorrespondiente.nivelDePrestamo
      };
    });

  } catch (error) {
    throw new Error(`Error al obtener las aplicaciones: ${error.message}`);
  }
};
