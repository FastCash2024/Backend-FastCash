import fetch from 'node-fetch';

export const sendSMS = async (req, res) => {
    const { to, text } = req.body;

    if (!to || !text) {
        return res.status(400).json({ error: 'Número de destinatario y texto del mensaje son requeridos.' });
    }

    try {
        const response = await fetch(`https://api.unimtx.com/?action=sms.message.send&accessKeyId=${process.env.UNIMTX_ACCESS_KEY_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to,
                text,
            }),
        });

        const data = await response.json();

        res.status(200).json({
            message: 'SMS enviado exitosamente',
            data,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al enviar el SMS',
            details: error.message,
        });
    }
}