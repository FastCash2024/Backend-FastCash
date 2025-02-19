const crypto = require("crypto");

const decryptPrivateKey = (privateKeyPem, passphrase) => {
    try {
        return crypto.createPrivateKey({
            key: privateKeyPem,
            passphrase,
        });
    } catch (error) {
        throw new Error("Error al descifrar la clave privada: " + error.message);
    }
};

module.exports = decryptPrivateKey;
