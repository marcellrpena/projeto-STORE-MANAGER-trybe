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

const resultSearchAllSales = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 2,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
]

const resultSearchSaleById = [
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
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
  resultSearchAllSales,
  resultSearchSaleById,
}