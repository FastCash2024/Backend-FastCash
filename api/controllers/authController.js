import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/AuthCollection.js';
import UserPersonal from '../models/AuthPersonalAccountCollection.js';


// Registro de usuario
export const registerPersonal = async (req, res) => {
    try {
        const {
            email,
            password,
            codificacionDeRoles,
            } = req.body;

        // Verificar si el usuario ya existe
        const userExists = await UserPersonal.findOne({ $or: [{ email }] });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear usuario
        const user = new UserPersonal({
            email,
            password: hashedPassword,
            codificacionDeRoles,

     
        });

        await user.save();

        // Crear token JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            token,
            user: {
                email: user.email,
                codificacionDeRoles,

            }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};

// Registro de usuario
export const register = async (req, res) => {
    try {
        const {
            origenDeLaCuenta,
            tipoDeGrupo,
            codificacionDeRoles,
            apodo,
            cuenta,
            email,
            password,
            situacionLaboral } = req.body;

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ $or: [{ email }, { cuenta }] });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear usuario
        const user = new User({
            origenDeLaCuenta,
            tipoDeGrupo,
            codificacionDeRoles,
            apodo,
            cuenta,
            email,
            password: hashedPassword,
            situacionLaboral
        });

        await user.save();

        // Crear token JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                origenDeLaCuenta: user.origenDeLaCuenta,
                tipoDeGrupo: user.tipoDeGrupo,
                codificacionDeRoles: user.codificacionDeRoles,
                apodo: user.apodo,
                cuenta: user.cuenta,
                email: user.email,
                situacionLaboral: user.situacionLaboral,
            }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};

// Login de usuario
export const login = async (req, res) => {
    try {
        const {
            cuenta,
            password,
        } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ cuenta });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Crear token JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                origenDeLaCuenta: user.origenDeLaCuenta,
                tipoDeGrupo: user.tipoDeGrupo,
                codificacionDeRoles: user.codificacionDeRoles,
                apodo: user.podo,
                cuenta: user.cuenta,
                email: user.email,
                situacionLaboral: user.situacionLaboral,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
export const loginPersonal = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        // Verificar si el usuario existe
        const user = await UserPersonal.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Crear token JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                codificacionDeRoles: user.codificacionDeRoles,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
export const loginVerificacion = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Crear token JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                codificacionDeRoles: user.codificacionDeRoles,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};








