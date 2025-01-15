import fetch from "node-fetch";
import { SmsModel } from "../models/smsModel.js";
import { generateRandomCode } from "../utilities/generateCode.js";

const checkUniqueCode = async (SmsModel, code) => {
  const existingCode = await SmsModel.findOne({ code });
  if (existingCode) {
    return checkUniqueCode(SmsModel, generateRandomCode());
  }
  return code;
};




export const sendSMS = async (req, res) => {
  const { to } = req.body;
  if (!to) {
    return res.status(400).json({
      error: "Número de destinatario es requerido.",
    });
  }
  try {
    const code = await checkUniqueCode(SmsModel, generateRandomCode());
    const response = await fetch(
      `https://api.unimtx.com/?action=sms.message.send&accessKeyId=${process.env.UNIMTX_ACCESS_KEY_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          templateId: "pub_otp_es",
          templateData: {
            code,
          },
        }),
      }
    );
    const data = await response.json();    
    if (data.code === "0") {
      const newSMS = new SmsModel({
        telefono: to,
        code
      });
      await newSMS.save();

      return res.status(200).json({
        message: "SMS enviado exitosamente",
        status: data.code,
        code: code,
        message: data.message,
        data: data.data.messages,
      });

    } else {
      return res.status(500).json({
        error: "Error al enviar el SMS",
        details: data.message || "Error desconocido",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Error al enviar el SMS",
      details: error.message,
    });
  }
};

export const verificarSMS = async (req, res) => {
  const { telefono, code } = req.body;

  if (!telefono || !code) {
    return res
      .status(400)
      .json({ error: "Número de teléfono y código son requeridos." });
  }

  try {
    const sms = await SmsModel.findOne({ telefono: telefono, code });

    if (!sms) {
      return res.status(400).json({ message: "Código no válido o expirado" });
    }

    res.json({
      message: "Código verificado con éxito",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al verificar el SMS",
      error: error.message,
    });
  }
};



export const sendSMSwebSystem = async (req, res) => {
  const { to } = req.body;
  if (!to) {
    return res.status(400).json({
      error: "Número de destinatario es requerido.",
    });
  }
  try {
    const code = await checkUniqueCode(SmsModel, generateRandomCode());
    const response = await fetch(
      `https://api.unimtx.com/?action=sms.message.send&accessKeyId=${process.env.UNIMTX_ACCESS_KEY_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          templateId: "pub_otp_en_basic2",
          templateData: {
            code,
          },
        }),
      }
    );
    const data = await response.json();    
    if (data.code === "0") {
      const newSMS = new SmsModel({
        telefono: to,
        code
      });
      await newSMS.save();

      return res.status(200).json({
        message: "SMS enviado exitosamente",
        status: data.code,
        code: code,
        message: data.message,
        data: data.data.messages,
      });

    } else {
      return res.status(500).json({
        error: "Error al enviar el SMS",
        details: data.message || "Error desconocido",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Error al enviar el SMS",
      details: error.message,
    });
  }
};
