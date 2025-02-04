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
        const { nombre, categoria, limit = 5, page = 1 } = req.query;

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

export const getApplicationsById = async (req, res) => {
    try {
        const { id } = req.params;
        let { page = 1, limit = 10 } = req.query; // Paginación desde query params (opcional)

        // Convertir a número
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        // Buscar la aplicación por ID
        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ message: "Aplicación no encontrada" });
        }

        // Obtener total de documentos
        const totalDocuments = application.tipos.length;

        // Calcular paginación
        const totalPages = Math.ceil(totalDocuments / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        // Obtener los tipos con paginación
        const tiposPaginados = application.tipos.slice(startIndex, endIndex);

        // Devolver la respuesta con el formato deseado
        res.status(200).json({
            _id: application._id,
            nombre: application.nombre,
            valorPrestado: application.valorPrestado,
            valorDepositoLiquido: application.valorDepositoLiquido,
            interesTotal: application.interesTotal,
            interesDiario: application.interesDiario,
            valorPrestamoMenosInteres: application.valorPrestamoMenosInteres,
            valorExtencion: application.valorExtencion,
            calificacion: application.calificacion,
            icon: application.icon,
            categoria: application.categoria,
            createdAt: application.createdAt,
            updatedAt: application.updatedAt,
            currentPage: page,
            totalPages,
            totalDocuments,
            data: tiposPaginados.map((tipo, index) => ({
                numero: startIndex + index + 1, // Enumeración
                ...tipo.toObject(), // Convertir el documento a objeto plano
            })),
        });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", details: error.message });
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

// tipo aplicacion 

export const addTipoApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const { valorPrestadoMasInteres, valorDepositoLiquido, interesTotal, interesDiario, valorPrestamoMenosInteres, valorExtencion, tipo } = req.body;

        console.log("aplicationId: ", id);
        console.log("body: ", req.body);

        const existingTipo = await Application.findOne({ _id: id, 'tipos.tipo': tipo });
        if (existingTipo) {
            return res.status(400).json({ message: 'El tipo ya existe en esta aplicación' });
        }

        const newTipo = { valorPrestadoMasInteres, valorDepositoLiquido, interesTotal, interesDiario, valorPrestamoMenosInteres, valorExtencion, tipo };

        console.log("newTipo: ", newTipo);

        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ message: 'La aplicación no existe' });
        }

        application.tipos.push(newTipo);
        await application.save();

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el tipo', details: error.message });
    }
};



export const updateTipoApplication = async (req, res) => {
    try {
        const { id, tipo } = req.params;        
        const { valorPrestadoMasInteres, valorDepositoLiquido, interesTotal, interesDiario, valorPrestamoMenosInteres, valorExtencion } = req.body;

        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ message: 'La aplicación no existe' });
        }

        const tipoToUpdate = application.tipos.find(t => t.tipo === tipo);
        if (!tipoToUpdate) {
            return res.status(404).json({ message: 'El tipo no existe en esta aplicación' });
        }

        tipoToUpdate.valorPrestadoMasInteres = valorPrestadoMasInteres || tipoToUpdate.valorPrestadoMasInteres;
        tipoToUpdate.valorDepositoLiquido = valorDepositoLiquido || tipoToUpdate.valorDepositoLiquido;
        tipoToUpdate.interesTotal = interesTotal || tipoToUpdate.interesTotal;
        tipoToUpdate.interesDiario = interesDiario || tipoToUpdate.interesDiario;
        tipoToUpdate.valorPrestamoMenosInteres = valorPrestamoMenosInteres || tipoToUpdate.valorPrestamoMenosInteres;
        tipoToUpdate.valorExtencion = valorExtencion || tipoToUpdate.valorExtencion;

        await application.save();

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el tipo', details: error.message });
    }
};


export const deleteTipoApplication = async (req, res) => {
    try {
        const { id, tipo } = req.params;

        // Buscar la aplicación
        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ message: 'La aplicación no existe' });
        }

        const tipoToDelete = application.tipos.find(t => t.tipo === tipo);
        if (!tipoToDelete) {
            return res.status(404).json({ message: 'El tipo no existe en esta aplicación' });
        }

        application.tipos = application.tipos.filter(t => t.tipo !== tipo); // Eliminar el tipo encontrado

        await application.save();

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el tipo', details: error.message });
    }
};

