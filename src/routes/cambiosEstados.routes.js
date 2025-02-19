const express = require("express");
const router = express.Router();
const cambiosEstadosController = require("../controllers/cambiosEstados.controller"); 

router.post("/", cambiosEstadosController);

module.exports = router;