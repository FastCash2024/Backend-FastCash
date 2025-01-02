import User from '../models/AuthCollection.js';
import UserPersonal from '../models/AuthPersonalAccountCollection.js';
import { FormModel } from '../models/FormModel.js'; // Asegúrate de usar la ruta correcta



// Obtener todos los usuarios
// export const getAllUsers = async (req, res) => {
//   try {
//     const { phoneNumber } = req.query;

//     // Validación de phoneNumber
//     if (phoneNumber && typeof phoneNumber !== "string") {
//       return res.status(400).json({ message: "El campo phoneNumber debe ser un string válido." });
//     }

//     // Construcción dinámica del filtro
//     const filter = {};
//     if (phoneNumber) {
//       // Buscar dentro de formData usando la notación de punto
//       filter["formData.phoneNumber"] = { $regex: phoneNumber, $options: "i" }; // Insensible a mayúsculas
//     }

//     // Consulta a MongoDB con filtro dinámico
//     const users = await FormModel.find(filter);

//     // Respuesta
//     if (users.length === 0) {
//       return res.status(404).json({ message: "No se encontraron usuarios que coincidan con el filtro." });
//     }

//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Ocurrió un error al obtener los usuarios.", error: error.message });
//   }
// };



// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const { tipoDeGrupo, situacionLaboral, emailPersonal } = req.query;
    // Construcción dinámica del filtro
    const filter = {};
    if (tipoDeGrupo) {
      filter.tipoDeGrupo = { $regex: tipoDeGrupo, $options: "i" }; // Insensible a mayúsculas
    }

    if (situacionLaboral) {
      filter.situacionLaboral = { $regex: situacionLaboral, $options: "i" }; // Insensible a mayúsculas
    }
    if (emailPersonal) {
      filter.emailPersonal = { $regex: emailPersonal, $options: "i" };
    }
    // Consulta a MongoDB con filtro dinámico
    const users = await User.find(filter);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllPersonalAccounts = async (req, res) => {
  try {
    const { email } = req.query;
    // Construcción dinámica del filtro
    const filter = {};
    if (email) {
      filter.email = { $regex: email, $options: "i" };
    }
    const users = await UserPersonal.find(filter);
    console.log(users)
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



