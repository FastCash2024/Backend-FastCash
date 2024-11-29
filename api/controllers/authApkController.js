import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserApk from '../models/AuthApkCollection.js';


// Registro de usuario
export const signin = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;
        console.log(req.body)
        // Verificar si el usuario ya existe
        const userExists = await UserApk.findOne({ $or: [{ email }] });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

    
        // Crear usuario
        const user = new UserApk({
            ...req.body
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
            user,
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
        const user = await UserApk.findOne({ cuenta });
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
        // // Enviar el JWT como una cookie HttpOnly
        // res.cookie('token', accessToken, {
        //     httpOnly: true, // Impide el acceso desde JavaScript
        //     secure: process.env.NODE_ENV !== 'production', // Asegura solo HTTPS en producción
        //     maxAge: 60 * 60 * 1000 // 1 hora
        // });
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














                                      