
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

        // Crear un nuevo documento en la base de datos
        const newForm = new FormModel({
            formData: body, // Datos del formulario
            images          // Información de las imágenes
        });

        // Guardar en MongoDB
        const savedForm = await newForm.save();

        return res.status(201).json({
            message: 'Datos y archivos guardados con éxito',
            data: savedForm
        });
    } catch (error) {
        console.error('Error en uploadMultipleFiles:', error);
        return res.status(500).json({ error: 'Error procesando la solicitud' });
    }
};





// // Controlador para manejar la subida de un archivo
// export const uploadSingleFile = (req, res) => {
//     try {
//         const { body, file } = req;

//         // Validar que el archivo exista
//         if (!file) {
//             return res.status(400).json({ error: 'Debe enviar un archivo' });
//         }

//         // Información del archivo subido
//         const fileInfo = {
//             originalName: file.originalname,
//             mimeType: file.mimetype,
//             size: file.size,
//             savedAs: file.filename // Nombre con el que se guarda
//         };

//         // Información adicional del formulario
//         const formData = body;

//         return res.status(201).json({
//             message: 'Archivo recibido con éxito',
//             fileInfo,
//             formData
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error procesando la solicitud' });
//     }
// };

// // Controlador para manejar la subida de múltiples archivos
// export const uploadMultipleFiles = (req, res) => {
//     try {
//         const { body, files } = req;

//         if (!files || files.length === 0) {
//             return res.status(400).json({ error: 'Debe enviar al menos un archivo' });
//         }

//         const fileInfo = files.map(file => ({
//             originalName: file.originalname,
//             mimeType: file.mimetype,
//             size: file.size,
//             savedAs: file.filename
//         }));

//         const formData = body;

//         return res.status(201).json({
//             message: 'Archivos recibidos con éxito',
//             fileInfo,
//             formData
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error procesando la solicitud' });
//     }
// };

