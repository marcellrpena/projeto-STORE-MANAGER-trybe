const productsFromDB = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  }
]

const serviceReturn = {
  message: productsFromDB,
  status: 200,
}

const createProduct = {
  name: "Produto x"
}
const serviceProductInsert = {
  id: 4,
  name: "Produto x",
}

const serviceReturnById = {
  message: productsFromDB[0],
  status: 200,
}

const productValidation = [
  { status: 400, message: { message: '"name" is required' } },
  { status: 422, message: { message: '"name" length must be at least 5 characters long' } },
]

module.exports = {
  productsFromDB,
  serviceReturn,
  serviceReturnById,
  createProduct,
  serviceProductInsert,
  productValidation,
};