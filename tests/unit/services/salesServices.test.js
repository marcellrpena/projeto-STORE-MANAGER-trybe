const { expect } = require("chai");
const sinon = require("sinon");
const errorMessages = require("../../../src/helpers/errorMessages");
const statusCode = require("../../../src/helpers/statusCode");
const { salesModel, productsModel } = require("../../../src/models");
const { salesService } = require("../../../src/services");
const { requestSale, sucessResultSale, notFoundProduct, productRequired, quantityRequired, invalidQuantity, resultSearchSale, resultSearchSaleById, resultSearchAllSales } = require("../mocks/salesModel.mock");

describe('Testando sales service', function () {
  describe('Listando vendas', function () {
    it('Caso de sucesso, service retorna um array com os dados da venda pelo ID', async function () {
      sinon.stub(salesModel, 'findSaleById').resolves(resultSearchSaleById);

      const result = await salesService.servicefindSalesById(1);

      expect(result.message).to.be.a('array');
      expect(result.message).to.be.deep.equal(resultSearchSaleById);
      expect(statusCode.OK).to.be.equal(200)
    });
    it('Caso de sucesso, service retorna um array com todas as vendas', async function () {
      sinon.stub(salesModel, 'findAllSales').resolves(resultSearchAllSales);

      const result = await salesService.servicefindAllSales();

      expect(result.message).to.be.a('array');
      expect(result.message).to.be.deep.equal(resultSearchAllSales);
      expect(statusCode.OK).to.be.equal(200)
    });
    it('Caso o Id da venda não exista no sistema', async function () {
      const result = await salesService.servicefindSalesById(999);

      expect(result.status).to.be.equal(404);
      expect(result.message).to.be.deep.equal(errorMessages.notFoundData('Sale'));
      expect(result.message).to.be.a('Object');
    });
  });
  describe('cadastrando uma nova venda', async function () {
    it('Caso de sucesso, quando cadastrar uma venda nova', async function () {
      sinon.stub(salesModel, 'openNewSale').resolves(3);
      sinon.stub(salesModel, 'insertProductSaleModel').resolves(1);
      sinon.stub(productsModel, 'findById').resolves(1);
      sinon.stub(salesModel, 'findSalesProductById').resolves(requestSale);

      const result = await salesService.insertSaleService(requestSale);

      expect(result.status).to.be.equal(statusCode.CREATED);
      expect(result.message).to.be.deep.equal(sucessResultSale);
      expect(result.message).to.be.a('Object');
    });
    it('Caso o Id do produto não exista no Banco de Dados, quando cadastrar uma venda nova', async function () {
      const result = await salesService.insertSaleService(notFoundProduct);

      expect(result.status).to.be.equal(404);
      expect(result.message).to.be.deep.equal(errorMessages.notFoundData('Product'));
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