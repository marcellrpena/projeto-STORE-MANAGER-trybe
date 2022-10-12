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

const serviceReturnById = {
  message: productsFromDB[0],
  status: 200,
}

module.exports = {
  productsFromDB,
  serviceReturn,
  serviceReturnById,
};