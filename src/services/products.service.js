const errorMessages = require('../helpers/errorMessages');
const statusCode = require('../helpers/statusCode');
const { productsModel } = require('../models');

const serviceFindAll = async () => {
  const result = await productsModel.findAll();
  if (result.length > 0) return { message: result, status: statusCode.OK };
  return {
    message: errorMessages.notFoundData,
    status: statusCode.BAD_REQUEST,
  };
};

const serviceFindById = async (productId) => {
  const result = await productsModel.findById(productId);
  if (result) return { message: result, status: statusCode.OK };
  return {
    message: errorMessages.notFoundData,
    status: statusCode.NOT_FOUND,
  };
};

module.exports = {
  serviceFindAll,
  serviceFindById,
};