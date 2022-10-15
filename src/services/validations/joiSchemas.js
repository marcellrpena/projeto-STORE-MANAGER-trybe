const Joi = require('joi');
// Um id precisa ser um numero, inteiro, não pode ser 0 ou menor que 0 não pode ser nulo.
const idSchema = Joi.number().integer().min(1).required();
const nameSchema = Joi.string().min(5).required();
const productIdSchema = Joi.number().integer().min(1).required();
const quantitySchema = Joi.number().integer().min(1).required();

const addProductSchema = Joi.object({
  name: nameSchema,
});
const insertSaleSchema = Joi.object({
  productId: productIdSchema,
  quantity: quantitySchema,
});

module.exports = {
  idSchema,
  addProductSchema,
  insertSaleSchema,
};