import fetch from "node-fetch";
import { SmsModel } from "../models/smsModel.js";
import { generateRandomCode } from "../utilities/generateCode.js";
import { FormModel } from '../models/FormModel.js';
import { SmsSendModel } from "../models/SmsCollection.js";
import { toHex } from "../utilities/sms.js";

const checkUniqueCode = async (SmsModel, code) => {
  const existingCode = await SmsModel.findOne({ code });
  if (existingCode) {
    return checkUniqueCode(SmsModel, generateRandomCode());
  }
  return code;
};

const saveOtpLog = async (telefono, code) => {
  const newSMS = new SmsModel({ telefono, code });
  await newSMS.save();
}

const sendOTPProvider = async (telefono, code) => {
  try {

    const message = `Tu codigo de verificacion para FastCash es: ${code}`;
    const encryptedMessage = toHex(message);

    const smsPayload = {
      message: encryptedMessage,
      phones: telefono,
      senderid: "80089",
      pwd: "DMr1CPxO",
      spid: "ROCLAUMXOTP",
    };

    const response = await fetch("http://94.74.64.43:8811/sms/send/v3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(smsPayload),
    });

    const data = await response.json();

    console.log("otp response: ", data);

    return {
      success: data.status === "0",
      responseData: data.results,
      error: data.status !== "0" ? data.desc || "Error desconocido" : null,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const sendSMSOtp = async (req, res) => {
  const { telefono } = req.body;
  if (!telefono) {
    return res.status(400).json({
      error: "Número de destinatario es requerido.",
    });
  }
  try {
    const code = await checkUniqueCode(SmsModel, generateRandomCode());
    const { success, error, responseData } = await sendOTPProvider(telefono, code);

    if (!success) {
      return res.status(500).json({ error: "Error al enviar el OTP", details: error })
    }

    await saveOtpLog(telefono, code);

    return res.status(200).json({
      message: "OTP enviado exitosamente",
      code: code,
      data: responseData,
    })
  } catch (error) {
    res.status(500).json({
      error: "Error al enviar Otp",
      details: error.message,
    });
  }
};

export const getSmsLogs = async (req, res) => {
  try {
    const { limit = 5, page = 1 } = req.query;

    const limitInt = parseInt(limit, 10);
    const pageInt = parseInt(page, 10);

    const skip = (pageInt - 1) * limitInt;

    const smsLogs = await SmsSendModel.find()
      .sort({ _id: -1 })
      .limit(limitInt)
      .skip(skip);

    const formattedLogs = smsLogs.map(log => {
      const fecha = new Date(log.fechaDeEnvio); // Convertir a Date
      return {
        ...log.toObject(), // Convertir a un objeto plano
        fechaDeEnvio: isNaN(fecha.getTime()) ? log.fechaDeEnvio : fecha.toISOString().split('T')[0], // Validar conversión
      };
    });
    // Obtener el total de documentos
    const totalDocuments = await SmsSendModel.countDocuments();

    // Calcular el numero total de páginas
    const totalPages = Math.ceil(totalDocuments / limitInt);

    res.json({
      data: formattedLogs,
      currentPage: pageInt,
      totalPages,
      totalDocuments,
    });
  } catch (error) {
    console.error("Error al obtener los registros de SMS:", error);
    res.status(500).json({ message: "Error al obtener los registros de SMS." });
  }
};

// export const verificarSMS2 = async (req, res) => {
//   const { to, code } = req.body;

//   if (!to || !code) {
//     return res
//       .status(400)
//       .json({ error: "Número de teléfono y código son requeridos." });
//   }

//   try {
//     const sms = await SmsModel.findOne({ telefono: to, code });

//     if (!sms) {
//       return res.status(400).json({ message: "Código no válido o expirado" });
//     }



//     const phoneNumber = to

//     // Construcción dinámica del filtro
//     const filter = {};
//     if (phoneNumber) {
//       // Buscar dentro de formData usando la notación de punto
//       filter["formData.phoneNumber"] = { $regex: phoneNumber, $options: "i" }; // Insensible a mayúsculas
//     }

//     // Consulta a MongoDB con filtro dinámico
//     const users = await FormModel.find(filter);

//     // Respuesta
//     if (users.length === 0) {
//       return res.status(404).json({ message: "No se encontraron usuarios que coincidan con el filtro." });
//     }

//     res.json(users);

//     // res.json({
//     //   message: "Código verificado con éxito",
//     // });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error al verificar el SMS",
//       error: error.message,
//     });
//   }
// };

export const verificarOTP = async (req, res) => {
  try {
    const { telefono, codigo } = req.body;

    if (!telefono || !codigo) {
      return res.status(400).json({ error: "El número de teléfono y el código OTP son requeridos." });
    }

    const otpRecord = await SmsModel.findOne({ telefono, code: codigo });

    if (!otpRecord) {
      const phoneExists = await SmsModel.findOne({ telefono });
      if (phoneExists) {
        return res.status(400).json({ error: "El código es incorrecto." });
      }
      return res.status(404).json({ error: "El número de teléfono no está registrado o no tiene un OTP válido." });
    }

    return res.status(200).json({ message: "Verificación realizada correctamente." });

  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al verificar el OTP.", details: error.message });
  }
};

// export const sendSMSwebSystem = async (req, res) => {
//   const { to } = req.body;
//   if (!to) {
//     return res.status(400).json({
//       error: "Número de destinatario es requerido.",
//     });
//   }
//   try {
//     const code = await checkUniqueCode(SmsModel, generateRandomCode());
//     const response = await fetch(
//       `https://api.unimtx.com/?action=sms.message.send&accessKeyId=${process.env.UNIMTX_ACCESS_KEY_ID}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           to,
//           templateId: "pub_otp_en_basic2",
//           templateData: {
//             code,
//           },
//         }),
//       }
//     );
//     const data = await response.json();
//     if (data.code === "0") {
//       const newSMS = new SmsModel({
//         telefono: to,
//         code
//       });
//       await newSMS.save();

//       return res.status(200).json({
//         message: "SMS enviado exitosamente",
//         status: data.code,
//         code: code,
//         message: data.message,
//         data: data.data.messages,
//       });

//     } else {
//       return res.status(500).json({
//         error: "Error al enviar el SMS",
//         details: data.message || "Error desconocido",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       error: "Error al enviar el SMS",
//       details: error.message,
//     });
//   }
// };

const sendSMSProvider = async (telefono, message) => {
  try {
    const response = await fetch("http://94.74.64.43:8811/sms/send/v3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        spid: "ROCLAUMXYX",
        pwd: "QYpjy9Zz",
        phones: telefono,
        message,
        senderid: "80838",
      }),
    });

    const data = await response.json();
    console.log("Respuesta: ", data)

    const success = data.status === "0";
    const error = success ? null : `Error en envío: ${data.desc || "Desconocido"}`;

    return { success, error }

  } catch (error) {
    return { success: false, error: error.message }
  }
}

const saveSMSLog = async (telefono, message, estado, remitenteDeSms, codigoDeProducto, producto) => {
  const newSMS = new SmsSendModel({
    numeroDeTelefonoMovil: telefono,
    contenido: message,
    canalDeEnvio: "SMS",
    remitenteDeSms,
    codigoDeProducto,
    producto,
    fechaDeEnvio: new Date().toISOString(),
    estadoDeEnvioDeSms: estado,
  })

  await newSMS.save();
}

export const sendCustomSMS = async (req, res) => {
  const { telefono, message, remitenteDeSms, codigoDeProducto, producto } = req.body;

  if (!telefono || !message || !remitenteDeSms || !codigoDeProducto || !producto) {
    return res.status(400).json({ error: "Fltan datos requeridos" });
  }

  const hexMessage = toHex(message);

  const { success, error } = await sendSMSProvider(telefono, hexMessage);
  const estado = success ? "Enviado" : "No enviado";

  await saveSMSLog(telefono, message, estado, remitenteDeSms, codigoDeProducto, producto);

  if (success) {
    return res.status(200).json({ message: "SMS enviado exitosamente" })
  } else {
    return res.status(500).json({ error: "Error al enviar el SMS", details: error });
  }
};