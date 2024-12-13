import express from 'express';
import twilio from 'twilio';

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

router.post('/verify-otp', async (req, res) => {
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

export default router;
