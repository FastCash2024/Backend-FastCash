const crypto = require('crypto');
const sign = crypto.createSign('SHA256');
const fs = require('fs')
const path = require('path');
const pemFilePath = path.resolve(__dirname, '../ssl/keyNode.pem');  
const pemData = fs.readFileSync(pemFilePath, 'utf8');
class CryptoHandler {
    constructor(ordenPagoWs) {
        this.cadenaOriginal = "||" +
                ordenPagoWs['institucionContraparte'] + "|" + //a
                ordenPagoWs['empresa'] + "|" + //b
                ordenPagoWs['fechaOperacion'] + "|" + //cd
                ordenPagoWs['claveRastreo'] + "|" + //e
                ordenPagoWs['institucionOperante'] + "|" + //f
                (ordenPagoWs['monto']).toFixed(2) + "|" + //g
                ordenPagoWs['tipoPago'] + "|"; //h
        if (ordenPagoWs['nombreOrdenante']) {
            this.cadenaOriginal = this.cadenaOriginal + ordenPagoWs['nombreOrdenante'] + "|"; //j
        }
        if (ordenPagoWs['cuentaOrdenante']) {
            this.cadenaOriginal = this.cadenaOriginal + ordenPagoWs['cuentaOrdenante'] + "|"; //k
        }
               
        if (ordenPagoWs['rfcCurpOrdenante']) {
            this.cadenaOriginal = this.cadenaOriginal + ordenPagoWs['rfcCurpOrdenante'] + "|"; //l
        }
        this.cadenaOriginal = this.cadenaOriginal + 
                ordenPagoWs['tipoCuentaBeneficiario'] + "|" + //m
                ordenPagoWs['nombreBeneficiario'] + "|" + //n
                ordenPagoWs['cuentaBeneficiario'] + "|" + //o
                ordenPagoWs['rfcCurpBeneficiario'] + "|" + //pqrstu
                ordenPagoWs['conceptoPago'] + "|" + //vwxyzaa
                ordenPagoWs['referenciaNumerica'] + "|" + //bbcc
                ordenPagoWs['topologia'] + "||"; //ddeeffgghh
    }

    getSign() {
        console.log(this.cadenaOriginal);
        
        const signer = crypto.createSign("RSA-SHA256");
        signer.update(this.cadenaOriginal);
        //return signer.sign(this.getPrivateKey(), "base64");
              
       return signer.sign(pemData, "base64");
    }

    getPrivateKey() {
        const privateKeyMatch = pemData.match(/-----BEGIN PRIVATE KEY-----[\s\S]+?-----END PRIVATE KEY-----/);
        if (!privateKeyMatch) {
            throw new Error("No se encontró clave privada cifrada");
        }
        const privateKey = privateKeyMatch[0];
        return privateKey; 
        //return decryptPrivateKey(privateKey, this.data.passphrase);
    }
}
module.exports = CryptoHandler;