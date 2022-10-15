const { salesService } = require('../services');

const insertSaleController = async (req, res) => {
  const result = await salesService.insertSaleService(req.body);
  res.status(result.status).json(result.message);
};

module.exports = {
  insertSaleController,
};