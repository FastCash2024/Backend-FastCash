import express from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import caseRoutes from './api/routes/caseRoutes.js';
import auditRoutes from './api/routes/auditRoutes.js';
import verificationRoutes from './api/routes/verificationRoutes.js';
import accessRoutes from './api/routes/accessRoutes.js';
import authRoutes from './api/routes/auth.js';
import otpRoutes from './api/routes/otpRoutes.js';

import authApkRoutes from './api/routes/authApk.js';
import emailRoutes from './api/routes/emailRoutes.js';
import counterRoutes from './api/routes/counterRoutes.js';
import { errorHandler } from './api/middleware/errorHandler.js';
import applicationsRoutes from './api/routes/applicationsRoutes.js';
import bodyParser from  'body-parser';
import twilio from 'twilio';
import uploadRoutes from './api/routes/uploadRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url'; // Asegúrate de importar fileURLToPath

dotenv.config();
const app = express();
app.use(bodyParser.json());


app.use(cors());
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// app.use(express.json());

// Conectar a MongoDB
connectDB();

app.use(express.json({ limit: '50mb' })); // Ajusta el límite según el tamaño de las solicitudes esperadas
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// Rutas
app.use('/api/cases', caseRoutes);
app.use('/api/audits', auditRoutes);
app.use('/api/verification', verificationRoutes);
app.use('/api/users', accessRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/counter', counterRoutes);

app.use('/api/otp', otpRoutes);


app.use('/api/applications', applicationsRoutes);
// app.use('/api/authApk', authApkRoutes);

app.use('/api/authApk', uploadRoutes);




// const __dirname = path.dirname(new URL(import.meta.url).pathname);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware de manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));









