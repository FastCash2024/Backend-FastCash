import AuditLog from '../models/AuditCollection.js';

// Crear un nuevo registro de auditoría
export const createAuditLog = async (req, res) => {
  try {
    const newAuditLog = new AuditLog(req.body);
    const savedLog = await newAuditLog.save();
    res.status(201).json(savedLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los registros de auditoría
export const getAllAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un registro de auditoría por ID
export const getAuditLogById = async (req, res) => {
  try {
    const log = await AuditLog.findById(req.params.id);
    if (!log) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un registro de auditoría
export const updateAuditLog = async (req, res) => {
  try {
    const updatedLog = await AuditLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLog) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json(updatedLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un registro de auditoría
export const deleteAuditLog = async (req, res) => {
  try {
    const deletedLog = await AuditLog.findByIdAndDelete(req.params.id);
    if (!deletedLog) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
