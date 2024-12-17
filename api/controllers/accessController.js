import User from '../models/AuthCollection.js';
import UserPersonal from '../models/AuthPersonalAccountCollection.js';

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users)
    res.json(users.filter(i => i?.tipoDeGrupo && i?.tipoDeGrupo.includes(req.query.tipoDeGrupo)));
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



