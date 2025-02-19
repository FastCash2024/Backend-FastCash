import { mongoose } from "mongoose";

const SmsSendSchema = new mongoose.Schema({
    contenido: {
        type: String,
        required: true
    },
    remitenteDeSms: {
        type: String,
        required: true
    },
    numeroDeTelefonoMovil: {
        type: String,
        required: true
    },
    canalDeEnvio: {
        type: String,
        required: true
    },
    codigoDeProducto: {
        type: String,
        required: true
    },
    producto: {
        type: String,
        required: true
    },
    fechaDeEnvio: {
        type: String,
        required: true
    },
    estadoDeEnvioDeSms: {
        type: String,
        required: true
    }
});


export const SmsSendModel = mongoose.model('SmsSend', SmsSendSchema); 