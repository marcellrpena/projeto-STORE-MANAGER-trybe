const { expect } = require("chai");
const sinon = require("sinon");
const { productsFromDB, createProduct } = require("../mocks/productsModel.mock");
const connection = require("../../../src/models/connection");
const { productsModel } = require('../../../src/models/index');
const statusCode = require("../../../src/helpers/statusCode");


describe('Model de produtos', function () {
  describe('Listando produtos', async function () {
    it('Retorna um array com todos os elementos', async function () {
      sinon.stub(connection, 'execute').resolves([productsFromDB]);

      const result = await productsModel.findAll();
      
      expect(result).to.be.a('array');
      expect(result).to.be.deep.eq(productsFromDB);
    });
    it('Retorna um array com o elemento referente ao id pesquisado', async function () {
      sinon.stub(connection, 'execute').resolves([[productsFromDB[0]]]);

      const result = await productsModel.findById(1);
      expect(result).to.be.deep.equal(productsFromDB[0]);
    });
  });
  describe('Criando novos produtos', function () {
    it('criando um novo produto', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 99 }]);

      const result = await productsModel.productInsert(createProduct);
      
      expect(result).to.equal(99);
    });
  });
  afterEach(() => {
    sinon.restore();
  });
});