const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productsController } = require('../../../src/controllers');
const errorMessages = require('../../../src/helpers/errorMessages');
const statusCode = require('../../../src/helpers/statusCode');
const { productsService } = require('../../../src/services');
const { serviceReturn, serviceReturnById, createProduct, serviceProductInsert } = require('../mocks/productsModel.mock');

chai.use(sinonChai);

describe('Testa controlller de produtos', function () {
  describe('Listagem de produtos', function () {
    it('lista todos os produtos', async function () {
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'serviceFindAll')
        .resolves(serviceReturn);

      await productsController.controllerFindAll({}, res);
      
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(serviceReturn.message);
    });
    it('Retorna um produto pelo seu Id', async function () {
      const res = {};
      const req = { params: { id: '1' } };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'serviceFindById')
        .resolves(serviceReturnById);

      await productsController.controllerFindById(req, res);

      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(serviceReturnById.message);
    });
    it('Falha ao encontrar um Id', async function () {
      const res = {};
      const req = { params: { id: 999 } }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'serviceFindById').resolves({
        status: 404,
        message: errorMessages.notFoundData('Product'),
      });
      await productsController.controllerFindById(req, res);

      expect(res.status).to.have.been.calledOnceWith(statusCode.NOT_FOUND);
      expect(res.json).to.have.been.calledOnceWith(errorMessages.notFoundData('Product'));
    });
  });
  describe('Teste de criação de produto', function () {
    it('criando um novo produto com sucesso ', async function () {
      const res = {};
      const req = { body: createProduct, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'serviceInsert').resolves({
        status: statusCode.CREATED,
        message: serviceProductInsert,
      });

      await productsController.controllerInsert(req, res);

      expect(res.status).to.have.been.calledOnceWith(statusCode.CREATED);
      expect(res.json).to.have.been.calledOnceWith(serviceProductInsert);
    });
  });
  describe('Teste de atualização de produto', function () {
    it('atualizando um produto com sucesso ', async function () {
      const res = {};
      const req = {
        body: {
          "name": "Martelo do Batman"
        },
        params: { id: '1' }
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'serviceUpdateProductById').resolves({
        status: statusCode.OK,
        message: {
          "id": 1,
          "name": "Martelo do Batman"
        },
      });

      await productsController.controllerUpdateProductById(req, res);

      expect(res.status).to.have.been.calledOnceWith(statusCode.OK);
      expect(res.json).to.have.been.calledOnceWith({
        "id": 1,
        "name": "Martelo do Batman"
      });
    });
    it('Retornando erro caso o produto não exista no banco de dados ', async function () {
      const res = {};
      const req = {
        body: {
          "name": "Martelo do Batman"
        },
        params: { id: '9999' }
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      /*sinon.stub(productsService, 'serviceUpdateProductById').resolves({
        status: statusCode.OK,
        message: {
          "id": 1,
          "name": "Martelo do Batman"
        },
      }); */

      await productsController.controllerUpdateProductById(req, res);

      expect(res.status).to.have.been.calledOnceWith(statusCode.NOT_FOUND);
      expect(res.json).to.have.been.calledOnceWith({ "message": "Product not found" });
    });
  });
  describe('DELETE de produto', function () {
    it('DELETA um produto com sucesso ', async function () {
      const res = {};
      const req = {
        params: { id: '1' }
      };
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'serviceDeleteProduct').resolves({
        status: statusCode.NO_CONTENT
      });

      await productsController.controllerDeleteProductById(req, res);
      expect(res.status).to.have.been.calledOnceWith(statusCode.NO_CONTENT);
    });
    it('Retornando erro caso o produto não exista no banco de dados ', async function () {
      const res = {};
      const req = {
        params: { id: '9999' }
      };
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'serviceDeleteProduct').resolves({
        status: statusCode.NOT_FOUND,
        message: { "message": "Product not found" },
      });

      await productsController.controllerDeleteProductById(req, res);

      expect(res.status).to.have.been.calledOnceWith(statusCode.NOT_FOUND);
      expect(res.json).to.have.been.calledOnceWith({ "message": "Product not found" });
    });
  });
  afterEach(() => {
    sinon.restore();
  });
});