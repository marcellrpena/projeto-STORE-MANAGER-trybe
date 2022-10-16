const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const statusCode = require('../../../src/helpers/statusCode');
const { salesService } = require('../../../src/services');
const { requestSale, sucessResultSale, resultSearchAllSales, resultSearchSaleById } = require('../mocks/salesModel.mock');

chai.use(sinonChai);

describe('Testa controlller de produtos', function () {
  describe('Listagem de vendas', function () {
    it('lista todas as vendas', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'servicefindAllSales')
        .resolves({
          status: statusCode.OK,
          message: resultSearchAllSales,
        });

      await salesController.controllerfindAllSales(req, res);

      expect(res.status).to.have.been.calledOnceWith(statusCode.OK);
      expect(res.json).to.have.been.calledOnceWith(resultSearchAllSales);
    });
    it('lista uma venda pelo ID', async function () {
      const res = {};
      const req = { params: { id: '1'} };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'servicefindSalesById')
        .resolves({
          status: statusCode.OK,
          message: resultSearchSaleById,
        });

      await salesController.controllerfindSaleById(req, res);

      expect(res.status).to.have.been.calledOnceWith(statusCode.OK);
      expect(res.json).to.have.been.calledOnceWith(resultSearchSaleById);
    });
  });
  describe('Inserção de venda', function () {
    it('Insere uma venda', async function () {
      const res = {};
      const req = { body: requestSale };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'insertSaleService')
        .resolves({
          status: statusCode.CREATED,
          message: { id: 3, itemsSold: requestSale }
        });

      await salesController.insertSaleController(req, res);
      
      expect(res.status).to.have.been.calledOnceWith(statusCode.CREATED);
      expect(res.json).to.have.been.calledOnceWith(sucessResultSale);
    });
  });
  this.afterEach(() => {
    sinon.restore();
  });
});