const express = require("express");
const router = express.Router();

const registraOrdenPagoRoutes = require("./registraOrdenPago.routes");
const retornaOrdenPagoRoutes = require("./retornaOrdenPago.routes");
const consultaOrdenRoutes= require("./consultaOrden.routes");
const ordenesRecibidasRoutes= require("./ordenesRecibidas.routes");
const cambiosEstadosRoutes = require("./cambiosEstados.routes");
//const authenticateToken = require("../middlewares/authMiddleware");

// Aplica la autenticacion a todas las rutas con un middleware
//router.use(authenticateToken);

router.use("/registar-orden-pago", registraOrdenPagoRoutes);
router.use("/retornar-orden-pago", retornaOrdenPagoRoutes);
router.use("/consulta-orden", consultaOrdenRoutes);
router.use("/cambios-estados", ordenesRecibidasRoutes);
router.use("/ordenes-recibidas", cambiosEstadosRoutes);


module.exports = router;
