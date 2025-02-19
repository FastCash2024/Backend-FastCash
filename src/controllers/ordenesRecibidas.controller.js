const requiredFields = [
    "id",
    "empresa",
    "claveRastreo",
    "estado", 
    "causaDevolucion",
    "tsLiquidacion"
];

const ordenesRecibidasController = (req, res) => {
    const inputData = req.body;
    
    const missingFields = requiredFields.filter((field) => !(field in inputData));
  
    if (missingFields.length > 0) {
      return res.status(400).json({
        mensaje: "devolver",
        id: 2,
        missingFields,
      });
    }
    
    return res.status(200).json({
      mensaje: "recibido",
    });
  };
  
  module.exports = ordenesRecibidasController;
