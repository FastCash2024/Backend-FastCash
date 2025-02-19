const express = require("express");
const registraOrdenPago = require("../controllers/registraOrdenPago.controller");

const router = express.Router();

router.put("/", registraOrdenPago);

module.exports = router;
