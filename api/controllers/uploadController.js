
import { FormModel } from '../models/FormModel.js'; // Asegúrate de usar la ruta correcta


export const uploadSingleFile = (req, res) => {
    try {
        const { body, file } = req;

        // Validar que el archivo exista
        if (!file) {
            return res.status(400).json({ error: 'Debe enviar un archivo' });
        }

        // Información del archivo subido
        const fileInfo = {
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            savedAs: file.filename // Nombre con el que se guarda
        };

        // Información adicional del formulario
        const formData = body;

        return res.status(201).json({
            message: 'Archivo recibido con éxito',
            fileInfo,
            formData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error procesando la solicitud' });
    }
};

export const uploadMultipleFiles = async (req, res) => {

    console.log(req)
    try {
        const { body, files } = req;

        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'Debe enviar al menos un archivo' });
        }

        // Preparar la información de las imágenes
        const images = files.map(file => ({
            originalName: file.originalname,
            savedAs: file.filename,
            mimeType: file.mimetype,
            size: file.size,
            path: file.path
        }));
        const formData = await JSON.parse(body.formData)
        // Crear un nuevo documento en la base de datos
        const newForm = new FormModel({
            formData: formData, // Datos del formulario
            images          // Información de las imágenes
        });

        // Guardar en MongoDB
        const savedForm = await newForm.save();
        console.log(savedForm)

        const sendRes = {
            nombres: formData.nombres,
            apellidos: formData.apellidos,
            correo: formData.correo,
            metodoPrestamo: formData.metodoPrestamo,
            nombreBanco: formData.nombreBanco,
            numeroCuenta: formData.numeroCuenta,
            numeroDocumento: formData.numeroDocumento,
            phoneNumber: formData.phoneNumber,
        }

        return res.status(201).json({
            message: 'Datos y archivos guardados con éxito',
            data: sendRes,
        });
    } catch (error) {
        console.error('Error en uploadMultipleFiles:', error);
        return res.status(500).json({ error: 'Error procesando la solicitud', msg: error});
    }
};



