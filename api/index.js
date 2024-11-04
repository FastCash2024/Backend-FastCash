
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import DataCollection from './models/DataCollection.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection with error handling
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create
app.post('/api/data', async (req, res) => {
  try {
    const newData = new DataCollection(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read (all)
app.get('/api/data', async (req, res) => {
  try {
    const data = await DataCollection.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read (single)
app.get('/api/data/:id', async (req, res) => {
  try {
    const data = await DataCollection.findById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Documento no encontrado' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update
app.put('/api/data/:id', async (req, res) => {
  try {
    const updatedData = await DataCollection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedData) return res.status(404).json({ message: 'Documento no encontrado' });
    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete
app.delete('/api/data/:id', async (req, res) => {
  try {
    const deletedData = await DataCollection.findByIdAndDelete(req.params.id);
    if (!deletedData) return res.status(404).json({ message: 'Documento no encontrado' });
    res.json({ message: 'Documento eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));