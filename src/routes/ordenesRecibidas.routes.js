const express = require("express");
const router = express.Router();
const ordenesRecibidasController = require("../controllers/ordenesRecibidas.controller"); 

router.post("/", ordenesRecibidasController);

module.exports = router;