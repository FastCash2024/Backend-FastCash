import Application from '../models/ApplicationsCollection.js';


// Registro de usuario
export const register = async (req, res) => {
    try {
        const {
            nombre,
        } = req.body

        console.log(req.body)
        // Verificar si el usuario ya existe
        const applicationExists = await Application.findOne({ $or: [{ nombre }] });
        if (applicationExists) {
            return res.status(400).json({ message: 'application already exists' });
        }

        // Crear usuario
        const application = new Application({
            ...req.body
        });

        await application.save();
        res.status(201).json({
            ...application,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};

// Login de usuario
export const getApplications = async (req, res) => {
    try {
        const application = await Application.find();
        res.json(application);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};










