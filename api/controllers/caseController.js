import Case from '../models/CaseCollection.js'

// Crear un nuevo caso
export const createCase = async (req, res) => {
  try {
    const newCase = new Case(req.body);
    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los casos
export const getAllCases = async (req, res) => {
  try {
    const cases = await Case.find();
    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un caso por ID
export const getCaseById = async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.id);
    if (!caseItem) return res.status(404).json({ message: 'Caso no encontrado' });
    res.json(caseItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un caso
export const updateCase = async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCase) return res.status(404).json({ message: 'Caso no encontrado' });
    res.json(updatedCase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un caso
export const deleteCase = async (req, res) => {
  try {
    const deletedCase = await Case.findByIdAndDelete(req.params.id);
    if (!deletedCase) return res.status(404).json({ message: 'Caso no encontrado' });
    res.json({ message: 'Caso eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
