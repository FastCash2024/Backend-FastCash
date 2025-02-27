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
import chatRoutes from './api/routes/chatRoutes.js';
import HourEntryRoutes from './api/routes/HourEntryRoutes.js';
import TrakingOperacionesDeCasosRoutes from './api/routes/TrakingOperacionesDeCasosRoutes.js';

import authApkRoutes from './api/routes/authApk.js';
import emailRoutes from './api/routes/emailRoutes.js';
import counterRoutes from './api/routes/counterRoutes.js';
import { errorHandler } from './api/middleware/errorHandler.js';
import applicationsRoutes from './api/routes/applicationsRoutes.js';
import bodyParser from  'body-parser';
import twilio from 'twilio';
import path from 'path';
import { fileURLToPath } from 'url'; // Asegúrate de importar fileURLToPath
import AWS from 'aws-sdk';
// import uploadRoutes from './api/routes/uploadRoutes.js';
import smsRoutes from './api/routes/smsRoutes.js';
import multaRoutes from './api/routes/multaRoutes.js';
import attendanceRoutes from './api/routes/attendanceRoutes.js';

import uploadRoutesS3 from './api/routes/uploadRoutesS3.js';
import newslaterRoutes from './api/routes/newslaterRoutes.js';
import comisionRoutes from './api/routes/comisionRoutes.js';
import clabesRoutes from './api/routes/clabesRoutes.js';

dotenv.config();
const app = express();
app.use(bodyParser.json());


app.use(cors());
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// app.use(express.json());

// Conectar a MongoDB
connectDB();

app.use(express.json({ limit: '100mb' })); // Ajusta el límite según el tamaño de las solicitudes esperadas
app.use(express.urlencoded({ limit: '100mb', extended: true }));
// Rutas
app.use('/api/cases', caseRoutes);
app.use('/api/audits', auditRoutes);
app.use('/api/verification', verificationRoutes);
app.use('/api/users', accessRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/counter', counterRoutes);
app.use('/api/otp', otpRoutes);
//Gestion de Aplicaciones Routes
app.use('/api/applications', applicationsRoutes);
// app.use('/api/authApk', authApkRoutes);

//Auth APK Routes
app.use('/api/authApk', uploadRoutesS3);

// Gestion de OTP, sms
app.use('/api/sms', smsRoutes);

app.use('/api/attendance', attendanceRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/entryhour', HourEntryRoutes);
app.use('/api/trakingoperaciones', TrakingOperacionesDeCasosRoutes);
app.use('/api/multas', multaRoutes);
//Contador de clabes routes
app.use('/api/clabes', clabesRoutes);

//Newlatter Routes
app.use('/api/newsletter', newslaterRoutes);
app.use('/api/comision', comisionRoutes);

// app.use('/api/counter', counterRoutes);  

// const __dirname = path.dirname(new URL(import.meta.url).pathname);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware de manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));









