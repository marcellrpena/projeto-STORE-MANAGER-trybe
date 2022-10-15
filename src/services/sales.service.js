const camelize = require('camelize');
const statusCode = require('../helpers/statusCode');
const { salesModel, productsModel } = require('../models');
const { validateSale } = require('./validations/validationsInputValues');
// retorna um array contendo vários insertId
const saveSaleProducts = (id, product) => product
  .map(async (value) => {
    await salesModel.insertProductSaleModel(id, value);
  });
// .some((value) => value === undefined);
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
  const newproducts = products.map((e) => {
    delete e.sale_id;
    return e;
  });
  // retorna uma mensagem contendo o codigo e os produtos da venda criada
  return { status: statusCode.CREATED, message: { id, itemsSold: camelize(newproducts) } };
};

module.exports = {
  insertSaleService,
};