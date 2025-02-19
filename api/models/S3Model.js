import s3 from '../config/s3Config.js';

export const uploadFile = async (file, fileName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${fileName}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  return s3.upload(params).promise();
};
// Función para subir archivos a S3
export const uploadFileToS3 = async (file, fileName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${fileName}`,  // El archivo se subirá en la carpeta 'uploads'
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const result = await s3.upload(params).promise();
    return result;  // Contiene la URL pública del archivo cargado
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error('Error uploading file to S3');
  }
};

export const getFile = async (fileName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${fileName}`,
  };
  return s3.getObject(params).promise();
};

export const deleteFile = async (fileName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${fileName}`,
  };
  return s3.deleteObject(params).promise();
};

export const getSignedUrl = (fileName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${fileName}`,
    Expires: 60 * 5,
  };
  return s3.getSignedUrlPromise('getObject', params);
};
