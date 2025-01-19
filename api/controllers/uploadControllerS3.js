import { uploadFile,uploadFileToS3, getFile, deleteFile, getSignedUrl } from '../models/S3Model.js';

export const handleFileUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    const data = await uploadFile(req.file, req.file.originalname);
    res.status(200).json({ url: data.Location });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading file', details: error.message });
  }
};
// Controlador para manejar la carga de múltiples archivos
export const handleFileUploadMultiples = async (req, res) => {
  console.log("----------------------s3")

  console.log(req.files)
  try {
    // Verificar que los archivos estén presentes
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }


    // console.log(req)

    const fileUrls = [];

    // Subir cada archivo a S3
    for (let file of req.files) {
      const fileName = file.originalname;  // Usar el nombre original o generar uno único
      const result = await uploadFileToS3(file, fileName);  // Subir archivo
      fileUrls.push(result.Location);  // Guardar la URL del archivo cargado
    }

    // Responder con las URLs de los archivos cargados
    return res.status(200).json({ message: 'Files uploaded successfully', urls: fileUrls });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error uploading files' });
  }
};

export const handleFileGet = async (req, res) => {
  try {
    const data = await getFile(req.params.fileName);
    res.setHeader('Content-Type', data.ContentType);
    res.send(data.Body);
  } catch (error) {
    res.status(500).json({ error: 'Error getting file', details: error.message });
  }
};

export const handleFileDelete = async (req, res) => {
  try {
    await deleteFile(req.params.fileName);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting file', details: error.message });
  }
};

export const handleGetSignedUrl = async (req, res) => {
  try {
    const url = await getSignedUrl(req.params.fileName);
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ error: 'Error generating signed URL', details: error.message });
  }
};
