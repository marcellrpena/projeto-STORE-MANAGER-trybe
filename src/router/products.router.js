const express = require('express');
const { productsController } = require('../controllers');
// const connection = require('../models/connection');

const router = express.Router();
// o router serve como um intermediário entre o app e o controller, ele pega a rota do app e envia para ser tratada pelo controller, extraindo os dados como params, body etc... 
router.get('/', productsController.controllerFindAll);

router.get('/:id', productsController.controllerFindById);

router.post('/', productsController.controllerInsert);

module.exports = router;