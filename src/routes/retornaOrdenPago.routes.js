const express = require("express");
const retornaOrdenPago = require("../controllers/retornaOrdenPago.controller");

const router = express.Router();

router.put("/", retornaOrdenPago);

module.exports = router;