const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();
// o router serve como um intermediário entre o app e o controller, ele pega a rota do app e envia para ser tratada pelo controller, extraindo os dados como params, body etc...  

router.get('/:id', salesController.controllerfindSaleById);
router.get('/', salesController.controllerfindAllSales);

// POST
router.post('/', salesController.insertSaleController);

module.exports = router;