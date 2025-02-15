import express from 'express';
import twilio from 'twilio';
import UserApk from '../models/AuthApkCollection.js';

const router = express.Router();

// Configuración de Twilio
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

router.post('/send-otp', async (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        return res.status(400).json({ success: false, message: 'Número de teléfono requerido' });
    }
    try {
        const verification = await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
            .verifications.create({ to: phoneNumber, channel: 'sms' });
        res.status(201).json({ success: true, sid: verification.sid, message: 'OTP enviado exitosamente' });
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message });
    }
});

router.post('/verify-otp-register', async (req, res) => {
    const { phoneNumber, code } = req.body;
    if (!phoneNumber || !code) {
        return res.status(400).json({ success: false, message: 'Teléfono y código son requeridos' });
    }
    try {
        const verificationCheck = await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
            .verificationChecks.create({ to: phoneNumber, code });
        if (verificationCheck.status === 'approved') {
            res.status(201).json({ success: true, message: 'OTP verificado correctamente' });
        } else {
            res.status(400).json({ success: false, message: 'OTP inválido o expirado' });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});



router.post('/verify-otp-login', async (req, res) => {
    const { phoneNumber, code } = req.body;
    if (!phoneNumber || !code) {
        return res.status(400).json({ success: false, message: 'Teléfono y código son requeridos' });
    }
    try {
        const verificationCheck = await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
            .verificationChecks.create({ to: phoneNumber, code });

        if (verificationCheck.status === 'approved') {
            res.status(201).json({ success: true, message: 'OTP verificado correctamente' });
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
        } else {
            res.status(400).json({ success: false, message: 'OTP inválido o expirado' });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

export default router;
