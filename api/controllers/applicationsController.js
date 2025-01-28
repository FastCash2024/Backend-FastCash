import Application from '../models/ApplicationsCollection.js';
import { uploadFile, uploadFileToS3, getFile, deleteFile, getSignedUrl } from '../models/S3Model.js';


export const register = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    try {
        const {
            nombre,
        } = req.body
        console.log(req.body)
        // Verificar si el usuario ya existe
        const applicationExists = await Application.findOne({ $or: [{ nombre }] });
        if (applicationExists) {
            return res.status(400).json({ message: 'application already exists' });
        }
        // cargar imagen
        const imgApp = await uploadFile(req.file, req.file.originalname);
        if (imgApp?.Location) {
            // Crear aplicacion
            const application = new Application({
                ...req.body,
                icon: imgApp.Location
            });

            await application.save();

            res.status(201).json({
                ...application,
            });
        } else {
            res.status(500).json({ error: 'Error uploading file', details: error.message });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error uploading file', details: error.message });
    }
};

// Registro de usuario
// export const register = async (req, res) => {
//     try {
//         const {
//             nombre,
//         } = req.body

//         console.log(req.body)
//         // Verificar si el usuario ya existe
//         const applicationExists = await Application.findOne({ $or: [{ nombre }] });
//         if (applicationExists) {
//             return res.status(400).json({ message: 'application already exists' });
//         }

//         // Crear usuario
//         const application = new Application({
//             ...req.body
//         });

//         await application.save();
//         res.status(201).json({
//             ...application,
//         });
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// Login de usuario
export const getApplications = async (req, res) => {
    try {
        const { nombre, categoria, limit = 5, page = 1 } = req.query;

        const filter = {};
        if (nombre) {
            filter.nombre = { $regex: nombre, $options: "i" };
        }
        if (categoria) {
            filter.categoria = { $regex: categoria, $options: "i" };
        }

        const totalDocuments = await Application.countDocuments(filter);

        const totalPages = Math.ceil(totalDocuments / limit);

        const applications = await Application.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * parseInt(limit));

        console.log("applications", applications)
        res.json({
            data: applications,
            currentPage: parseInt(page),
            totalPages,
            totalDocuments,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getApplicationsToApp = async (req, res) => {
    try {
        const {nombre, categoria, limit = 5, page = 1} = req.query;
    
        const filter = {};
        if (nombre) {
            filter.nombre = { $regex: nombre, $options: "i" };
        }
        if (categoria) {
            filter.categoria = { $regex: categoria, $options: "i" };
        }

        const applications = await Application.find(filter)
       

        console.log("applications", applications)
        res.json(
         applications
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCustomers = async (req, res) => {
    try {
        const result = await Application.distinct("nombre");
        console.log("result", result);
        res.json(result);
    } catch (error) {
        console.error("Error al obtener el flujo de clientes:", error);
        res.status(500).json({ message: "Error al obtener el flujo de clientes." });

    }
}

export const updateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const { } = req.body;

        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ message: 'La aplicación no existe' });
        }

        if (req.file) {
            if (application.icon) {
                await deleteFile(application.icon);
            }

            const imgApp = await uploadFile(req.file, req.file.originalname);
            if (imgApp?.Location) {
                req.body.icon = imgApp.Location;
            } else {
                return res.status(500).json({ error: 'Error uploading file' });
            }
        }

        Object.assign(application, req.body);
        await application.save();

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la aplicación', details: error.message });
    }
};

export const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;

        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ message: 'La aplicación no existe' });
        }

        if (application.icon) {
            await deleteFile(application.icon);
        }

        await Application.findByIdAndDelete(id);

        res.status(200).json({ message: 'Aplicación eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la aplicación', details: error.message });
    }
};
