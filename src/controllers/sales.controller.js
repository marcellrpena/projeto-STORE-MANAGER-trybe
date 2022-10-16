const { salesService } = require('../services');

const insertSaleController = async (req, res) => {
  const result = await salesService.insertSaleService(req.body);
  res.status(result.status).json(result.message);
};

const controllerfindAllSales = async (_req, res) => {
  const result = await salesService.servicefindAllSales();
  res.status(result.status).json(result.message);
};

const controllerfindSaleById = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.servicefindSalesById(Number(id));
  res.status(result.status).json(result.message);
};

module.exports = {
  insertSaleController,
  controllerfindAllSales,
  controllerfindSaleById,
};