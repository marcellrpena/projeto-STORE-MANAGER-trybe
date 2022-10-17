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

const productUpdated = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
  },
  undefined,
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
  productUpdated,
};