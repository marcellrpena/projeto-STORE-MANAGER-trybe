const requestSale = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const notFoundProduct = [
  {
    "productId": 99,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const productRequired = [
  {
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const quantityRequired = [
  {
    "productId": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const invalidQuantity = [
  {
    "productId": 1,
    "quantity": 0
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const sucessResultSale = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

module.exports = {
  requestSale,
  sucessResultSale,
  notFoundProduct,
  productRequired,
  quantityRequired,
  invalidQuantity,
}