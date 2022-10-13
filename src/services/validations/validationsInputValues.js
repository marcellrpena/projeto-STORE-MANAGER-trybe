const errorMessages = require('../../helpers/errorMessages');
const statusCode = require('../../helpers/statusCode');
const { idSchema, addProductSchema } = require('./joiSchemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { status: statusCode.NOT_FOUND, message: errorMessages.notFoundData };
  return { status: null, message: '' };
};

const validateProduct = (name) => {
  const { error } = addProductSchema.validate(name);
  if (error) {
    if (error.message.includes('is required')) {
      return { status: statusCode.BAD_REQUEST, message: { message: error.message } };
    }
    if (error.message.includes('length must be')) {
      return { status: statusCode.UNPROCESSABLE_ENTITY, message: { message: error.message } };
    }
  }
  return { status: null, message: '' };
};

module.exports = {
  validateId,
  validateProduct,
};