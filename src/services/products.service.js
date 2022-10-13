const errorMessages = require('../helpers/errorMessages');
const statusCode = require('../helpers/statusCode');
const { productsModel } = require('../models');
const { validateId } = require('./validations/validationsInputValues');

const serviceFindAll = async () => {
  const result = await productsModel.findAll();
  if (result.length > 0) return { message: result, status: statusCode.OK };
  return {
    message: errorMessages.notFoundData,
    status: statusCode.BAD_REQUEST,
  };
};

const serviceFindById = async (productId) => {
  // primeiro filtro valida se o Id digitado é valido
  const validationId = validateId(productId);
  if (validationId.type) return validationId;

  // segundo filtro verifica se o ID existe no banco de dados 
  const result = await productsModel.findById(productId);
  if (result) return { message: result, status: statusCode.OK };
  return { message: errorMessages.notFoundData, status: statusCode.NOT_FOUND,
  };
};

const serviceInsert = async (product) => {
  const { name } = product;

  const newProductId = await productsModel.productInsert({ name });
  const newProduct = await productsModel.findById(newProductId);

  return { status: statusCode.CREATED, message: newProduct };
};

module.exports = {
  serviceFindAll,
  serviceFindById,
  serviceInsert,
};