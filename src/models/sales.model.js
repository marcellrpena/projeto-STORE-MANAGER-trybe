const connection = require('./connection');

const insertProductSaleModel = async (id, { productId, quantity }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [id, productId, quantity],
  );
  return insertId;
};

const openNewSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (CURRENT_TIMESTAMP());',
  );
  return insertId;
};

const findSalesProductById = async (id) => {
  const [result] = await connection.execute(
    'SELECT product_id AS "productId", quantity FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
  return result;
};

const findSaleById = async (id) => {
  const [result] = await connection.execute(
    'SELECT sales.date, salesp.product_id AS "productId", salesp.quantity'
    + ' FROM StoreManager.sales_products AS salesp'
    + ' INNER JOIN StoreManager.sales AS sales ON sales.id = salesp.sale_id'
    + ' WHERE salesp.sale_id = ?;',
    [id],
  );
  return result;
};
const findAllSales = async () => {
  const [result] = await connection.execute(
    'SELECT  salesp.sale_id AS "saleId", sales.date, salesp.product_id AS "productId",'
    + ' salesp.quantity FROM StoreManager.sales_products AS salesp'
    + ' INNER JOIN StoreManager.sales AS sales ON sales.id = salesp.sale_id;',
  );
  return result;
};
module.exports = {
  insertProductSaleModel,
  openNewSale,
  findSalesProductById,
  findSaleById,
  findAllSales,
};