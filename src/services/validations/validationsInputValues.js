const errorMessages = require('../../helpers/errorMessages');
const statusCode = require('../../helpers/statusCode');
const { idSchema } = require('./joiSchemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { status: statusCode.NOT_FOUND, message: errorMessages.notFoundData };
  return { type: null, message: '' };
};

module.exports = {
  validateId,
};