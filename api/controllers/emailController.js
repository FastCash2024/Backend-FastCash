import nodemailer from 'nodemailer'

export async function sendEmail(req, res) {
    console.log('ghj')
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "fastcashmxec2024@gmail.com",
            pass: "ltbq zthr zpcw cvjl",
        },
    });
    try {
        await transporter.sendMail({
            from: 'fastcashmxec2024@gmail.com',
            to: req.body.email,
            subject: `${req.body.subject}`,
            html: req.body.html,
            // attachments: [
            //     {
            //         filename: `Cotizacion_${req.body.element}.pdf`,
            //         content: req.body.pdfBase64.split("base64,")[1],
            //         encoding: 'base64'
            //     }
            // ]
        });
        return res.json({ msg: 'Send Email SuccessFull' })
    } catch (err) {
        console.log(err)
        return res.json({ msg: `error ${err}` })
    }

}