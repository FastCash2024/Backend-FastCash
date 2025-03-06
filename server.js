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
app.use('/api/cases', caseRoutes);// No sirve
app.use('/api/audits', auditRoutes);// No sirve
app.use('/api/verification', verificationRoutes); // CasesDB ---> manejador de casos
app.use('/api/users', accessRoutes); // CasesDB ---> distribuidor de casos RENOMBRAR
app.use('/api/auth', authRoutes); // AuthAndSMS ---> LoginSIstema
app.use('/api/email', emailRoutes); // AuthAndSMS ---> sistema de gmails
app.use('/api/counter', counterRoutes); // CasesDB ---> contador de numerosDeCaso
app.use('/api/otp', otpRoutes); // No sirve
//Gestion de Aplicaciones Routes
app.use('/api/applications', applicationsRoutes);// KardexDB ---> comision
// app.use('/api/authApk', authApkRoutes);

//Auth APK Routes
app.use('/api/authApk', uploadRoutesS3); // AuthAndSMS ---> LoginAPK

// Gestion de OTP, sms
app.use('/api/sms', smsRoutes);   // AuthAndSMS ---> SMS

app.use('/api/attendance', attendanceRoutes); // KardexDB ---> Asistencia
app.use('/api/chat', chatRoutes);   // AuthAndSMS ---> chatSistemaAPK
app.use('/api/entryhour', HourEntryRoutes); // KardexDB ---> comision
app.use('/api/trakingoperaciones', TrakingOperacionesDeCasosRoutes);  // KardexDB ---> comision
app.use('/api/multas', multaRoutes); // KardexDB ---> comision
//Contador de clabes routes
app.use('/api/clabes', clabesRoutes); // CasesDB ---> distribuidor de casos RENOMBRAR

//Newlatter Routes
app.use('/api/newsletter', newslaterRoutes); // KardexDB ---> comision
app.use('/api/comision', comisionRoutes); // KardexDB ---> comision

// app.use('/api/counter', counterRoutes);  

// const __dirname = path.dirname(new URL(import.meta.url).pathname);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware de manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

                  







