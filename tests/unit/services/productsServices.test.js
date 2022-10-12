const { expect } = require("chai");
const sinon = require("sinon");
const errorMessages = require("../../../src/helpers/errorMessages");
const statusCode = require("../../../src/helpers/statusCode");
const { productsModel } = require("../../../src/models");
const { productsService } = require("../../../src/services");
const { productsFromDB } = require("../mocks/productsModel.mock");

describe('Testando product service', function () {
  describe('Listando produtos', function () {
    it('Caso de sucesso, model retorna um array com elementos', async function () {
      sinon.stub(productsModel, 'findAll').resolves(productsFromDB);

      const result = await productsService.serviceFindAll();

      expect(result.message).to.be.a('array');
      expect(result.message).to.be.deep.equal(productsFromDB);
      expect(statusCode.OK).to.be.equal(200)
    });
    it('Caso de sucesso, model retorna o produto a partir do seu Id', async function () {
      sinon.stub(productsModel, 'findById').resolves(productsFromDB[0]);

      const result = await productsService.serviceFindById(1);

      expect(result.message).to.be.a('Object');
      expect(result.message).to.be.deep.equal(productsFromDB[0]);
      expect(result.status).to.be.equal(statusCode.OK)
    });
    it('Caso de falha, model retorna uma menssagem de ERRO e status 404', async function () {
      sinon.stub(productsModel, 'findById').resolves(null);

      const result = await productsService.serviceFindById(9999);
      
      expect(result.message).to.be.deep.equal({ "message": "Product not found" });
      expect(result.status).to.be.equal(statusCode.NOT_FOUND);
    });
  });
  afterEach(() => {
    sinon.restore();
  });
});