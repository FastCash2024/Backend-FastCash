const express = require("express");
const router = express.Router();
const consultaOrdenController = require("../controllers/consultaOrden.controller"); 

router.post("/", consultaOrdenController);

module.exports = router;