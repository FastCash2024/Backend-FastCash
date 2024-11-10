import express from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import caseRoutes from './api/routes/caseRoutes.js';
import auditRoutes from './api/routes/auditRoutes.js';
import verificationRoutes from './api/routes/verificationRoutes.js';
import accessRoutes from './api/routes/accessRoutes.js';
import authRoutes from './api/routes/auth.js';
import emailRoutes from './api/routes/emailRoutes.js';
import counterRoutes from './api/routes/counterRoutes.js';
import { errorHandler } from './api/middleware/errorHandler.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Rutas
app.use('/api/cases', caseRoutes);
app.use('/api/audits', auditRoutes);
app.use('/api/verification', verificationRoutes);
app.use('/api/users', accessRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/counter', counterRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));









