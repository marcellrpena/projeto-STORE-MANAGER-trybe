const { expect } = require("chai");
const sinon = require("sinon");
const errorMessages = require("../../../src/helpers/errorMessages");
const statusCode = require("../../../src/helpers/statusCode");
const { productsModel } = require("../../../src/models");
const { productsService } = require("../../../src/services");
const { productsFromDB, serviceProductInsert, createProduct, productValidation } = require("../mocks/productsModel.mock");

describe('Testando product service', function () {
  describe('Listando produtos', function () {
    it('Caso de sucesso, service retorna um array com elementos', async function () {
      sinon.stub(productsModel, 'findAll').resolves(productsFromDB);

      const result = await productsService.serviceFindAll();

      expect(result.message).to.be.a('array');
      expect(result.message).to.be.deep.equal(productsFromDB);
      expect(statusCode.OK).to.be.equal(200)
    });
    it('Caso de sucesso, service retorna o produto a partir do seu Id', async function () {
      sinon.stub(productsModel, 'findById').resolves(productsFromDB[0]);

      const result = await productsService.serviceFindById(1);

      expect(result.message).to.be.a('Object');
      expect(result.message).to.be.deep.equal(productsFromDB[0]);
      expect(result.status).to.be.equal(statusCode.OK)
    });
    it('retorna um erro caso receba um ID inválido', async function () {
      const result = await productsService.serviceFindById('a');

      expect(result.message).to.be.deep.equal(errorMessages.notFoundData);
      expect(result.status).to.be.equal(statusCode.NOT_FOUND);
    });
    it('Caso de falha, service retorna uma menssagem de ERRO e status 404', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const result = await productsService.serviceFindById(1);
      
      expect(result.message).to.be.deep.equal({ "message": "Product not found" });
      expect(result.status).to.be.equal(statusCode.NOT_FOUND);
    });
  });
  describe('Criando novos produtos', function () {
    it('caso tudo esteja correto cria um produto', async function () {
      sinon.stub(productsModel, 'productInsert').resolves(4);
      sinon.stub(productsModel, 'findById').resolves(serviceProductInsert)

      const result = await productsService.serviceInsert(createProduct);

      expect(result.status).to.equal(statusCode.CREATED);
      expect(result.message).to.deep.equal(serviceProductInsert);
    });
    it('Será validado que não é possível realizar operações sem o campo name', async function () {
      const result = await productsService.serviceInsert({});

      expect(result.status).to.equal(statusCode.BAD_REQUEST);
      expect(result.message).to.deep.equal(productValidation[0].message);
    });
    it('Será validado que não é possível realizar operações com o campo name menor que 5 caracteres', async function () {
      const result = await productsService.serviceInsert({ name: 'marc' });

      expect(result.status).to.equal(statusCode.UNPROCESSABLE_ENTITY);
      expect(result.message).to.deep.equal(productValidation[1].message);
    });
  });
  afterEach(() => {
    sinon.restore();
  });
});