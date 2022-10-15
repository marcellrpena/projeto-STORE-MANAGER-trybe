const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require("../../../src/models");
const connection = require("../../../src/models/connection");
const { requestSale } = require("../mocks/salesModel.mock");

describe('Model de Vendas', function () {
  describe('Buscando vendas cadastradas', async function () {
    it('valida se é possivel buscar uma venda a partir do Id', async function () {
      sinon.stub(connection, 'execute').resolves([requestSale]);

      const result = await salesModel.findSalesProductById(3);

      expect(result).to.be.a('array');
      expect(result).to.be.deep.equal(requestSale);
    });
  });
  describe('Cadastrando nova venda', async function () {
    it('valida se é possivel cadastrar uma nova venda', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

      const result = await salesModel.openNewSale();
      
      expect(result).to.be.equal(4);
    })
    it('valida se é possivel cadastrar novos produtos na venda', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

      const result = await salesModel.openNewSale(4, requestSale);

      expect(result).to.be.equal(4);
    })
  });
  afterEach(() => {
    sinon.restore();
  });
});