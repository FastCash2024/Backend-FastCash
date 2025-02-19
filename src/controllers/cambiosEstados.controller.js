async function verification(subscriptionId) {
    const url = `https://api.fastcash-mx.com/api/verification/${subscriptionId}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error al consumir la API:', error.response?.data || error.message);
        throw error;
    }
}

async function verificationAdd(subscriptionId) {
  const url = `https://api.fastcash-mx.com/api/verification/${subscriptionId}`;
  try {
      const response = await axios.get(url, {
          headers: {
              'Content-Type': 'application/json',
          }
      });

      return response.data;
  } catch (error) {
      console.error('Error al consumir la API:', error.response?.data || error.message);
      throw error;
  }
}




const requiredFields = [
  "id",
  "fechaOperacion",
  "institucionOrdenante",
  "institucionBeneficiaria",
  "claveRastreo",
  "monto",
  "nombreOrdenante",
  "tipoCuentaOrdenante",
  "cuentaOrdenante",
  "rfcCurpOrdenante",
  "nombreBeneficiario",
  "tipoCuentaBeneficiario",
  "cuentaBeneficiario",
  "conceptoPago",
  "referenciaNumerica",
  "empresa",
  "tipoPago",
  "tsLiquidacion",
  "folioCodi",
];

const validateFields = (requiredFields, inputData) => {
  const missingFields = requiredFields.filter(
    (field) => !inputData[field] || inputData[field].toString().trim() === ""
  );

  return missingFields;
};

const cambiosEstadosController = (req, res) => {
    const inputData = req.body;
    const requiredFields = ["cuentaBeneficiario", "claveRastreo", "monto"];
    const missingFields = validateFields(requiredFields, inputData);
    console.log(missingFields);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        mensaje: "devolver",
        id: 2,
        missingFields,
      });
    }
   
    return res.status(200).json({
      mensaje: "confirmar",
    });
  };
  
  module.exports = cambiosEstadosController;
