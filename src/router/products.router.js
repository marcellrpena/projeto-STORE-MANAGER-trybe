const express = require('express');
const { productsController } = require('../controllers');
// const connection = require('../models/connection');

const productRouter = express.Router();
// o router serve como um intermediário entre o app e o controller, ele pega a rota do app e envia para ser tratada pelo controller, extraindo os dados como params, body etc... 
productRouter.get('/', productsController.controllerFindAll);

productRouter.get('/:id', productsController.controllerFindById);

module.exports = {
  productRouter,
};
