const Joi = require('joi');
// Um id precisa ser um numero, inteiro, não pode ser 0 ou menor que 0 não pode ser nulo.
const idSchema = Joi.number().integer().min(1).required();

module.exports = {
  idSchema,
};