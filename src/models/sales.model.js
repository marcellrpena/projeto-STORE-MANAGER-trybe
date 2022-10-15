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
    'SELECT product_id, quantity FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
  return result;
};

module.exports = {
  insertProductSaleModel,
  openNewSale,
  findSalesProductById,
};