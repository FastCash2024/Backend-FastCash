const fs = require("fs");
const path = require("path");
const forge = require("node-forge");
const crypto = require("crypto");
const axios = require("axios");
const decryptPrivateKey = require("../utils/decryptPrivateKey");
const dispersionService = require('../middlewares/dispersionServiceMiddleware'); 

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

const retornaOrdenPago = async (req, res) => {
    const {
        fechaOperacion, ///fechageneraracion //
        nombreBanco,
        montoSolicitado,
        cuentabancaria,
        _id
    } = req.body;
    //console.log(req.body); //recoleccionYValidacionDatos
    
    const empresa='ROCLAU';
    const institucionOperante=cuentabancaria;
    const claveRastreo=idSubFactura;
    const claveRastreoDevolucion=idSubFactura;
    const monto=montoSolicitado;
    const digitoIdentificadorBeneficiario=2;
    const medioEntrega=3;
   /* if (!fechaOperacion || !nombreBanco || !idSubFactura || !montoSolicitado || !_id) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }*/

    // Construir la cadena original
    
    const cadenaOriginal = `||${fechaOperacion}|${institucionOperante}|${claveRastreo}|${monto}|${digitoIdentificadorBeneficiario}|${claveRastreoDevolucion}|${medioEntrega}||`;
   
    console.log(cadenaOriginal);
    
    // Desencriptar la clave privada
    const decryptedPrivateKey = decryptPrivateKey(privateKeyPem, password);
    

    // Firmar la cadena original
    const signer = crypto.createSign("RSA-SHA256");
    signer.update(cadenaOriginal);
    signer.end();
    const firma = signer.sign(decryptedPrivateKey, "base64");

    const data = {
        fechaOperacion,
        institucionOperante,
        claveRastreo,
        claveRastreoDevolucion,
        empresa,
        monto,
        digitoIdentificadorBeneficiario,
        medioEntrega,
        firma
    };

    try {
        const response = await axios.put('https://demo.stpmex.com:7024/speiws/rest/ordenPago/retornaOrden', data, {
            headers: {
                'Content-Type': 'application/json',
                'Encoding': 'UTF-8'
            }
        });

        let observacion=false;
                
        if (response.data?.resultado?.descripcionError) {
          observacion=true; 
         }else{            
          observacion=false;
        }
        const dedonde="retorna";
       // const result = await dispersionService(_id, data, observacion, dedonde, claveRastreo);
        res.status(200).json({
            success: true,
            response:response.data,
         //   data: result,
        });
            
    } catch (error) {
        console.error("Error retornando la orden de pago:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = retornaOrdenPago;
