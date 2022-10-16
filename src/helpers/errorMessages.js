const isRequired = (type) => {
  const message = `"${type}" is required`;
  return { message };
};

const notFoundData = (type) => {
  const message = `${type} not found`;
  return { message };
};

const invalidQuantity = (type) => {
  const message = `"${type}" must be greater than or equal to 1`;
  return { message };
};
module.exports = {
  notFoundData,
  isRequired,
  invalidQuantity,
};