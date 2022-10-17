const statusCode = require('../helpers/statusCode');
const { salesModel, productsModel } = require('../models');
const { validateSale } = require('./validations/validationsInputValues');
// retorna um array contendo vários insertId
const saveSaleProducts = (id, product) => product
    .map(async (value) => {
      await salesModel.insertProductSaleModel(id, value);
    });

const findProductById = (product) => product
  .map(async ({ productId }) => {
    const search = await productsModel.findById(productId);
    return search === undefined;
  });

const insertSaleService = async (product) => {
  // verifica se o productId é valido
  const error = validateSale(product);
  if (error.status) return error;

  // verifica se o productId existe no banco de dados
  const notFoundProduct = await Promise.all(findProductById(product));
  if (notFoundProduct.includes(true)) {
    return {
      status: statusCode.NOT_FOUND, message: { message: 'Product not found' },
    };
  }
  // cria uma nova venda
  const id = await salesModel.openNewSale();
  // vincula o Id da nova venda criada com os produtos inseridos
  await Promise.all(saveSaleProducts(id, product));
  // busca os produtos da venda criada para confirmar a criação
  const products = await salesModel.findSalesProductById(id);
  // retorna uma mensagem contendo o codigo e os produtos da venda criada
  return { status: statusCode.CREATED, message: { id, itemsSold: products } };
};

const servicefindSalesById = async (saleId) => {
  // busca a venda específica por Id
  const sales = await salesModel.findSaleById(saleId);
  // verifica se a venda existe no sistema
  if (sales.length > 0) {
    return { status: statusCode.OK, message: sales };
  }
  return {
    status: statusCode.NOT_FOUND, message: { message: 'Sale not found' },
  };
};

const servicefindAllSales = async () => {
  // busca todas as vendas
  const sales = await salesModel.findAllSales();
  return { status: statusCode.OK, message: sales };
};

module.exports = {
  insertSaleService,
  servicefindSalesById,
  servicefindAllSales,
};