require('dotenv').config();
const app = require("./app");

if (!process.env.HOST || !process.env.PORT) {
  console.error("Error: Las variables HOST y PORT no están definidas en el archivo .env");
  process.exit(1); 
}
const dbConfig = {
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10)
};

const startServer = () => {
    try {
      app.listen(dbConfig.port, dbConfig.host, () => {
            console.log(`Servidor corriendo en http://${dbConfig.host}:${dbConfig.port}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error.message);
        process.exit(1); 
    }
};

startServer();
