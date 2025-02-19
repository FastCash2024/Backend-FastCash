const fs = require("fs");
const path = require("path");
const forge = require("node-forge");
const crypto = require("crypto");
const axios = require("axios");
const decryptPrivateKey = require("../utils/decryptPrivateKey");

const p12Path = path.resolve(__dirname, "../ssl/llavePrivada.p12");

if (!fs.existsSync(p12Path)) {
  console.error(`Archivo no encontrado: ${p12Path}`);
  process.exit(1);
}

// Leer el archivo .p12
const p12Data = fs.readFileSync(p12Path);

// Contraseña del archivo .p12
const password = "*Navegante1468";

let privateKeyPem = null;
let certificatePem = null;

try {
  // Cargar el archivo .p12 en formato PKCS12
  const p12Asn1 = forge.asn1.fromDer(p12Data.toString("binary"));
  const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, password);

  // Extraer la clave privada y los certificados
  p12.safeContents.forEach((safeContent) => {
    safeContent.safeBags.forEach((safeBag) => {
      // Extraer la clave privada
      if (safeBag.type === forge.pki.oids.pkcs8ShroudedKeyBag) {
        const privateKey = safeBag.key;
        privateKeyPem = forge.pki.privateKeyToPem(privateKey);
      }

      // Extraer el certificado
      if (safeBag.type === forge.pki.oids.certBag) {
        const cert = safeBag.cert;
        certificatePem = forge.pki.certificateToPem(cert);
      }
    });
  });

  // Guardar la clave privada y el certificado en archivos separados
  if (privateKeyPem) {
    const privateKeyPath = path.resolve(__dirname, "../ssl/privateKey.pem");
    fs.writeFileSync(privateKeyPath, privateKeyPem, "utf8");
  } else {
    console.error("No se encontró una clave privada en el archivo .p12");
  }

  if (certificatePem) {
    const certificatePath = path.resolve(__dirname, "../ssl/certificate.pem");
    fs.writeFileSync(certificatePath, certificatePem, "utf8");
  } else {
    console.error("No se encontró un certificado en el archivo .p12");
  }
} catch (error) {
  console.error("Error al procesar el archivo .p12:", error.message);
  process.exit(1);
}


const consultaOrden = async (req, res) => {
    const { claveRastreo, empresa, tipoOrden,fechaOperacion } = req.body;

    if (!claveRastreo || !empresa || !tipoOrden) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    
    if (tipoOrden === 'R' && !fechaOperacion) {
        return res.status(400).json({ error: "La fechaOperacion es obligatoria para las órdenes históricas" });
    }

    let cadenaOriginal = `||${empresa}|${claveRastreo}|${tipoOrden}|||`;
    if (fechaOperacion) {
        cadenaOriginal = `||${empresa}|${claveRastreo}|${tipoOrden}|${fechaOperacion}|||`;
    }

    // Desencriptar la clave privada
    const decryptedPrivateKey = decryptPrivateKey(privateKeyPem, password);

    // Firmar la cadena original
    const signer = crypto.createSign("RSA-SHA256");
    signer.update(cadenaOriginal);
    signer.end();
    const firma = signer.sign(decryptedPrivateKey, "base64");

    const data = {
        claveRastreo,
        empresa,
        fechaOperacion,
        tipoOrden,
        firma
    };

    try {
        const response = await axios.post('https://efws-dev.stpmex.com/efws/API/consultaOrden', data, {
            headers: {
                'Content-Type': 'application/json',
                'Encoding': 'UTF-8'
            }
        });

        return res.status(200).json({
            respuesta: response.data
        });

    } catch (error) {
        if (error.response) {
            console.error("Error en la respuesta del servidor:", error.response.data);
            return res.status(500).json({ detalles: error.response.data });
        } else {
            console.error("Error en la solicitud:", error.message);
            return res.status(500).json({ error: "Error interno del servidor", detalles: error.message });
        }
    }
};

module.exports = consultaOrden;
