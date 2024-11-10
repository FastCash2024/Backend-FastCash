import CounterAccess from '../models/CountCollection.js'

// Obtener el valor de un contador específico por nombre
export const getCounter = async (req, res) => {
  const { name } = req.params;
  try {
    let counter = await CounterAccess.findOne({ name });
    if (!counter) {
      // Si no existe el contador, se crea con valor inicial 0
      counter = new Counter({ name, count: 0 });
      await counter.save();
    }
    res.json({ count: counter.count });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el contador' });
  }
};

// Incrementar el valor de un contador específico por nombre
export const incrementCounter = async (req, res) => {
  const { name } = req.params;
  try {
    const counter = await CounterAccess.findOneAndUpdate(
      { name },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    res.json({ count: counter.count });
  } catch (error) {
    res.status(500).json({ message: 'Error al incrementar el contador' });
  }
};

// Resetear un contador a un valor específico
export const resetCounter = async (req, res) => {
  const { name } = req.params;
  const { count } = req.body;  // Valor específico al que se quiere resetear
  try {
    const counter = await CounterAccess.findOneAndUpdate(
      { name },
      { count },
      { new: true, upsert: true }
    );
    res.json({ count: counter.count });
  } catch (error) {
    res.status(500).json({ message: 'Error al resetear el contador' });
  }
};


