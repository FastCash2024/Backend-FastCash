import User from '../models/AuthCollection.js';
import UserPersonal from '../models/AuthPersonalAccountCollection.js';

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const { tipoDeGrupo, situacionLaboral } = req.query;
    // Construcción dinámica del filtro
    const filter = {};
    if (tipoDeGrupo) {
      filter.tipoDeGrupo = { $regex: tipoDeGrupo, $options: "i" }; // Insensible a mayúsculas
    }

    if (situacionLaboral) {
      filter.situacionLaboral = { $regex: situacionLaboral, $options: "i" }; // Insensible a mayúsculas
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
    const users = await UserPersonal.find();
    console.log(users)
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



