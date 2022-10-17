const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC',
  );
  return result;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};

const productInsert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [product.name],
  );
  return insertId;
};

const productUpdateById = async (productId, dataToUpdate) => {
  const result = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?;',
    [dataToUpdate, productId],
  );
  return result;
};

const productDelete = async (productId) => {
  const result = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  productInsert,
  productUpdateById,
  productDelete,
};