const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const statusCode = require('../../../src/helpers/statusCode');
const { salesService } = require('../../../src/services');
const { requestSale, sucessResultSale } = require('../mocks/salesModel.mock');

chai.use(sinonChai);

describe('Testa controlller de produtos', function () {
  describe('Listagem de produtos', function () {
    it('lista todos os produtos', async function () {
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