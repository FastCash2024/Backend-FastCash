import VerificationCollection  from '../models/Credit.js';

class CreditService {
  // Crear un nuevo crédito
  async createCredit(data) {
    try {
      const newCredit = new VerificationCollection(data);
      return await newCredit.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Obtener todos los créditos
  async getAllCredits() {
    try {
      return await Credit.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Obtener un crédito por ID
  async getCreditById(id) {
    try {
      const credit = await Credit.findById(id);
      if (!credit) throw new Error('Crédito no encontrado');
      return credit;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Actualizar un crédito
  async updateCredit(id, data) {
    try {
      const updatedCredit = await Credit.findByIdAndUpdate(id, data, { new: true });
      if (!updatedCredit) throw new Error('Crédito no encontrado');
      return updatedCredit;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Eliminar un crédito
  async deleteCredit(id) {
    try {
      const deletedCredit = await Credit.findByIdAndDelete(id);
      if (!deletedCredit) throw new Error('Crédito no encontrado');
      return { message: 'Crédito eliminado exitosamente' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new CreditService();
