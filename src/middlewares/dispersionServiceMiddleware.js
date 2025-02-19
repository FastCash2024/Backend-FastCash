const axios = require('axios');

async function updateSTP(subscriptionId) {
    const url = `https://api.fastcash-mx.com/api/verification/updateSTP/${subscriptionId}`;
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


const dispersionService = async (_id, data, observacion, dedonde, idSubFactura) => {
        
    if (!data || typeof data !== 'object') {
        throw new Error('El parámetro "data" debe ser un objeto válido.');
    }

    const url = `https://api.fastcash-mx.com/api/verification/${_id}`;

    try {
        const response = await axios.put(url, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        let datos = response.data;
        if (observacion) {
            datos.estadoDeCredito = "Error de dispercion STP";
        } else {
            if (dedonde === "registra") {//dispersado
                datos.fechaDeDispersion = new Date();
                datos.estadoDeCredito = "Dispersado";
                datos.idDeSubFactura=idSubFactura;
            } else if (dedonde === "retorna") { //pagado
                const updaspt = await updateSTP(idSubFactura);
                datos.fechaDeReembolso = new Date();
                datos.estadoDeCredito = "Reembolsado";
                datos.idDeSubFactura=idSubFactura;
            }
        }
                

        return datos;
    } catch (error) {
        console.error('Error en el servicio de dispersión:', error.message);
        throw error;
    }
};

module.exports = dispersionService;
