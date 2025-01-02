import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/AuthCollection.js';
import UserPersonal from '../models/AuthPersonalAccountCollection.js';
import { uploadFile } from '../models/S3Model.js';

// REGISTER, LOGIN, AND UPDATE CUENTAS OPERATIVAS  
export const register = async (req, res) => {
    try {
        const {
            origenDeLaCuenta,
            tipoDeGrupo,
            codificacionDeRoles,
            apodo,
            cuenta,
            password,
            situacionLaboral,
            emailPersonal,
        } = req.body;

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ $or: [{ cuenta }] });
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
            emailPersonal,
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
                emailPersonal: user.emailPersonal,
                situacionLaboral: user.situacionLaboral,
            }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
};
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
export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params; // Obtener el id del usuario de la URL
        const {
            origenDeLaCuenta,
            tipoDeGrupo,
            codificacionDeRoles,
            apodo,
            situacionLaboral,
            cuenta,
            password,// Nuevo password
            nombrePersonal,
            emailPersonal,
        } = req.body;

        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Si se pasa una nueva contraseña, encriptarla
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // Actualizar los demás campos del usuario
        user.origenDeLaCuenta = origenDeLaCuenta || user.origenDeLaCuenta;
        user.tipoDeGrupo = tipoDeGrupo || user.tipoDeGrupo;
        user.codificacionDeRoles = codificacionDeRoles || user.codificacionDeRoles;
        user.apodo = apodo || user.apodo;
        user.situacionLaboral = situacionLaboral || user.situacionLaboral;
        user.cuenta = cuenta || user.cuenta;
        user.nombrePersonal = nombrePersonal || user.nombrePersonal,
            user.emailPersonal = emailPersonal || user.emailPersonal;

        // Guardar los cambios en la base de datos
        await user.save();

        // Responder con los datos actualizados del usuario
        res.json({
            message: 'Usuario actualizado con éxito',
            user: {
                id: user._id,
                origenDeLaCuenta: user.origenDeLaCuenta,
                tipoDeGrupo: user.tipoDeGrupo,
                codificacionDeRoles: user.codificacionDeRoles,
                apodo: user.apodo,
                situacionLaboral: user.situacionLaboral,
                cuenta: user.cuenta,
                nombrePersonal: user.nombrePersonal,
                emailPersonal: user.emailPersonal,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// REGISTER, LOGIN, AND UPDATE CUENTAS PERSONALES  
export const registerPersonal = async (req, res) => {
    try {
        const { body, file } = req;
        // Validar que el archivo exista
        if (!file) {
            return res.status(400).json({ error: 'Debe enviar un archivo' });
        }
        // Información del archivo subido
        const fileInfo = {
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            savedAs: file.filename // Nombre con el que se guarda
        };
        // Información adicional del formulario
        const formData = body;
        return res.status(201).json({
            message: 'Archivo recibido con éxito',
            fileInfo,
            formData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error procesando la solicitud' });
    }

    // try {
    //     const {
    //         email,
    //         password,
    //         codificacionDeRoles,
    //     } = req.body;

    //     // Verificar si el usuario ya existe
    //     const userExists = await UserPersonal.findOne({ $or: [{ email }] });
    //     if (userExists) {
    //         return res.status(400).json({ message: 'User already exists' });
    //     }

    //     // Encriptar la contraseña
    //     const salt = await bcrypt.genSalt(10);
    //     const hashedPassword = await bcrypt.hash(password, salt);
    //     // Crear usuario
    //     const user = new UserPersonal({
    //         email,
    //         password: hashedPassword,
    //         codificacionDeRoles,
    //     });
    //     await user.save();
    //     // Crear token JWT
    //     const token = jwt.sign(
    //         { userId: user._id },
    //         process.env.JWT_SECRET,
    //         { expiresIn: '1d' }
    //     );

    //     res.status(201).json({
    //         token,
    //         user: {
    //             email: user.email,
    //             codificacionDeRoles,
    //         }
    //     });
    // } catch (error) {
    //     console.log(error)
    //     res.status(500).json({ message: 'Server error' });
    // }
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
        console.log(user)
        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        console.log("match", isMatch)
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
                email: user.email,
                nombreCompleto: user.nombreCompleto,
                dni: user.dni,
                telefono: user.telefono,
                cuenta: user.cuenta,
                codificacionDeRoles: user.codificacionDeRoles,
                fotoURL: user.fotoURL
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
export const updateUserPersonal = async (req, res) => {
    try {
        const { userId } = req.params; // Obtener el id del usuario de la URL

        const {
            cuenta,
            apodo,
            telefono,
            dni,
            nombreCompleto,
            codificacionDeRoles,
            email,
            password // Nuevo password
        } = req.body;

        // Verificar si el usuario existe
        const user = await UserPersonal.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Si se pasa una nueva contraseña, encriptarla
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        if (req.file) {
            // cargar imagen
            const imgApp = await uploadFile(req.file, req.file.originalname);

            if (imgApp?.Location) {
                user.fotoURL = imgApp.Location || user.fotoURL;
            } else {
                res.status(500).json({ error: 'Error uploading file', details: error.message });
            }
        }

        // Actualizar los demás campos del usuario
        user.cuenta = cuenta || user.cuenta;
        user.apodo = apodo || user.apodo;
        user.telefono = telefono || user.telefono;
        user.dni = dni || user.dni;
        user.nombreCompleto = nombreCompleto || user.nombreCompleto;
        user.codificacionDeRoles = codificacionDeRoles || user.codificacionDeRoles;
        user.email = email || user.email;


        // Guardar los cambios en la base de datos
        await user.save();

        // Responder con los datos actualizados del usuario
        res.json({
            message: 'Usuario actualizado con éxito',
            user: {
                id: userId,
                cuenta: user.cuenta,
                apodo: user.apodo,
                telefono: user.telefono,
                dni: user.dni,
                nombreCompleto: user.nombreCompleto,
                codificacionDeRoles: user.codificacionDeRoles,
                email: user.email,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Login with token cuentas operativas y cuentas personales
export const getProfileWithToken = async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization; // Obtener el token del header
    if (!token) {
        return res.status(401).json({ message: 'Token requerido' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        // Responder con la información del usuario, similar al login
        if (user) {
            console.log("user", user)
            return res.json({
                token,
                user: {
                    id: user._id,
                    origenDeLaCuenta: user.origenDeLaCuenta,
                    tipoDeGrupo: user.tipoDeGrupo,
                    codificacionDeRoles: user.codificacionDeRoles,
                    apodo: user.podo,
                    cuenta: user.cuenta,
                    emailPersonal: user.emailPersonal,
                    situacionLaboral: user.situacionLaboral,
                }
            });
        }
        const userPersonal = await UserPersonal.findById(decoded.userId);
        if (userPersonal) {
            console.log("userPersonal", userPersonal)
            // Responder con los datos actualizados del usuario
            return res.json({
                message: 'Usuario actualizado con éxito',
                user: {
                    id: userPersonal._id,
                    email: userPersonal.email,
                    nombreCompleto: userPersonal.nombreCompleto,
                    dni: userPersonal.dni,
                    telefono: userPersonal.telefono,
                    cuenta: userPersonal.cuenta,
                    codificacionDeRoles: userPersonal.codificacionDeRoles,
                    fotoURL: userPersonal.fotoURL
                }
            });
        }
        if (!user && !userPersonal) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.log(error)
        res.status(403).json({ message:  error });
    }
};

//
export const getUsersWithFilters = async (req, res) => {
  





    
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




