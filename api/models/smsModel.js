import { mongoose } from "mongoose";

const SmsSchema = new mongoose.Schema({
    telefono: {type: String, require: true},
    code: {type: String, require: true},
    createdAt: { type: Date, default: Date.now },
});

export const SmsModel = mongoose.model('otp', SmsSchema); 