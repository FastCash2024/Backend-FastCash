import { mongoose } from "mongoose";

const ChatSchema = new mongoose.Schema({
    subId: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      enum: ['Consulta', 'Respuesta'], 
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    fecha: {
      type: String,
      default: () => new Date().toISOString(),
    },
  });

  
export const ChatModel = mongoose.model("chat", ChatSchema);