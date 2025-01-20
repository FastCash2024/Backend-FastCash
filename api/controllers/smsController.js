import fetch from "node-fetch";
import { SmsModel } from "../models/smsModel.js";
import { generateRandomCode } from "../utilities/generateCode.js";
import { SmsSendModel } from "../models/SmsCollection.js";
import { FormModel } from '../models/FormModel.js'; // Asegúrate de usar la ruta correcta

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

export const getSmsLogs = async (req, res) => {
  try {
    const { limit = 5, page = 1 } = req.query;

    const limitInt = parseInt(limit, 10);
    const pageInt = parseInt(page, 10);

    const skip = (pageInt - 1) * limitInt;

    const smsLogs = await SmsSendModel.find()
      .limit(limitInt)
      .skip(skip);

    // Obtener el total de documentos
    const totalDocuments = await SmsSendModel.countDocuments();

    // Calcular el numero total de páginas
    const totalPages = Math.ceil(totalDocuments / limitInt);

    res.json({
      data: smsLogs,
      currentPage: pageInt,
      totalPages,
      totalDocuments,
    });
  } catch (error) {
    console.error("Error al obtener los registros de SMS:", error);
    res.status(500).json({ message: "Error al obtener los registros de SMS." });
  }
};

export const sendCustomSMS = async (req, res) => {
  const { to, templateId, contenido, codigoDeProducto, remitenteDeSms, name, producto, fecha, valor_de_pago } = req.body;
  if (!to || !templateId || !contenido || !codigoDeProducto) {
    return res.status(400).json({
      error: "Todos los campos son requeridos: to, templateId, contenido, codigoDeProducto.",
    });
  }
  try {
    const response = await fetch(
      `https://api.unimtx.com/?action=sms.message.send&accessKeyId=${process.env.UNIMTX_ACCESS_KEY_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          templateId,
          templateData: {
            name,
            producto,
            fecha,
            valor_de_pago
          },
        }),
      }
    );
    const data = await response.json();
    console.log("respuesta: ", data.code)
    const estadoDeEnvioDeSMS = data.code === "0" ? "Enviado" : "No enviado";
    const newSMS = new SmsSendModel({
      contenido,
      remitenteDeSms,
      numeroDeTelefonoMovil: to,
      canalDeEnvio: "SMS",
      codigoDeProducto,
      producto,
      fechaDeEnvio: new Date(),
      estadoDeEnvioDeSMS
    });
    await newSMS.save();

    if (data.code === "0") {
      return res.status(200).json({
        message: "SMS enviado exitosamente",
        status: data.code,
        code: data.code,
        message: data.message,
        data: data.data.messages,
      });
    } else {
      return res.status(200).json({
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

export const verificarSMS2 = async (req, res) => {
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





export const verificarSMS = async (req, res) => {
  console.log(req)
  try {
    const { contacto } = req.query;

    // Construcción dinámica del filtro
    const filter = {};
    if (contacto) {
      // Buscar dentro de formData usando la notación de punto
      filter["formData.contacto"] = { $regex: contacto, $options: "i" }; // Insensible a mayúsculas
    }

    // Consulta a MongoDB con filtro dinámico
    const users = await FormModel.find(filter);
    console.log(contacto)
    console.log(users)

    // Respuesta
    if (users.length === 0) {
      return res.status(404).json({ message: "No se encontraron usuarios que coincidan con el filtro." });
    }
    if (users.length > 1) {

      return res.status(204).json({ message: "Many Accounts" });

    }
    if (users.length === 1) {
      const formData = { ...users[0].formData, photoURLs: [...users[0].images.map((image) => `https://api.fastcash-mx.com/${image.path}`)] }
      delete formData['contactos']
      delete formData['sms']


      const dataRes = {
        userID: users[0].id,
        ...formData
      }
      return res.json(dataRes);
      ;
    }
    return res.status(404).json({ message: "non exist" });

  } catch (error) {
    res.status(500).json({ message: "Ocurrió un error al obtener los usuarios.", error: error.message });
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
