const { expect } = require("chai");
const sinon = require("sinon");
const errorMessages = require("../../../src/helpers/errorMessages");
const statusCode = require("../../../src/helpers/statusCode");
const { salesModel } = require("../../../src/models");
const { salesService } = require("../../../src/services");
const { requestSale, sucessResultSale, notFoundProduct, productRequired, quantityRequired, invalidQuantity } = require("../mocks/salesModel.mock");

describe('Testando sales service', function () {
  describe('cadastrando uma nova venda', async function () {
    it('Caso de sucesso, quando cadastrar uma venda nova', async function () {
      sinon.stub(salesModel, 'openNewSale').resolves(3);
      sinon.stub(salesModel, 'insertProductSaleModel').resolves(1);
      sinon.stub(salesModel, 'findSalesProductById').resolves(requestSale);

      const result = await salesService.insertSaleService(requestSale);

      expect(result.status).to.be.equal(statusCode.CREATED);
      expect(result.message).to.be.deep.equal(sucessResultSale);
      expect(result.message).to.be.a('Object');
    });
    it('Caso o Id do produto não exista no Banco de Dados, quando cadastrar uma venda nova', async function () {
      const result = await salesService.insertSaleService(notFoundProduct);

      expect(result.status).to.be.equal(404);
      expect(result.message).to.be.deep.equal(errorMessages.notFoundData);
      expect(result.message).to.be.a('Object');
    });
    it('Caso não exista o campo productId na requisição, quando cadastrar uma venda nova', async function () {
      const result = await salesService.insertSaleService(productRequired);

      expect(result.status).to.be.equal(400);
      expect(result.message).to.be.deep.equal(errorMessages.isRequired('productId'));
      expect(result.message).to.be.a('Object');
    });
    it('Caso não exista o campo quantity na requisição, quando cadastrar uma venda nova', async function () {
      const result = await salesService.insertSaleService(quantityRequired);

      expect(result.status).to.be.equal(400);
      expect(result.message).to.be.deep.equal(errorMessages.isRequired('quantity'));
      expect(result.message).to.be.a('Object');
    });
    it('Caso o campo quantity tenha um valor menor ou igual a 0, quando cadastrar uma venda nova', async function () {
      const result = await salesService.insertSaleService(invalidQuantity);

      expect(result.status).to.be.equal(422);
      expect(result.message).to.be.deep.equal(errorMessages.invalidQuantity('quantity'));
      expect(result.message).to.be.a('Object');
    });
  });
  afterEach(() => {
    sinon.restore();
  });
});