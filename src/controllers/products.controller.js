const { productsService } = require('../services');

// em controller fica basicamente a callback que estava dentro da função de rota do express
const controllerFindAll = async (_req, res) => {
  // o service abaixo por sua vez pega os antigos dados vindos da rota executa regras de validação com eles e chama a camada model caso a validação se confirme, a camada MODEL por sua vez executa o codigo MYSQL retornando a resposta para service que por sua vez retorna um objeto contendo o STATUS de validação e a mensagem vinda do DB.
  const result = await productsService.serviceFindAll();
  
  res.status(result.status).json(result.message);
};

const controllerFindById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.serviceFindById(Number(id));
  res.status(result.status).json(result.message);
};

const controllerInsert = async (req, res) => {
  const product = await productsService.serviceInsert({ ...req.body });
  res.status(product.status).json(product.message);
};

const controllerUpdateProductById = async (req, res) => {
  const { body, params: { id } } = req;
  const product = await productsService.serviceUpdateProductById(Number(id), body);
  res.status(product.status).json(product.message);
};

const controllerDeleteProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.serviceDeleteProduct(Number(id));
  if (product.message) return res.status(product.status).json(product.message);
  res.status(product.status).end();
};

module.exports = {
  controllerFindAll,
  controllerFindById,
  controllerInsert,
  controllerUpdateProductById,
  controllerDeleteProductById,
};