const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const HistoryController = require('./historyController');
const HistoryUsecase = require('../usecases/historyUsecase');
const Error = require('../errors')

describe('historyController', () => {
    describe('execute', () => {
        let req;
        let res;
        let historyUsecase;
        beforeEach(() => {
            req = { };
            status = sinon.stub();
            res = { status, json: function() {} };
            status.returns(res);
            const repo = sinon.spy();
            historyUsecase = new HistoryUsecase(repo);
        });
        it('should return success with value', async () => {
            const orders = [{id: 1, customer_name: 'name', customer_address: 'aaa', customer_phone: '123'}];
            const stub = sinon.stub(historyUsecase, 'execute').resolves({msg: 'success', object: orders});
            const mock = sinon.mock(res);
            mock.expects('json').once().withArgs({data: orders, msg: 'success', success: true});
            const historyController = new HistoryController(historyUsecase);
            await historyController.execute(req, res);
            expect(stub.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            mock.verify();
        })
        it('should return error', async () => {
            const stub = sinon.stub(historyUsecase, 'execute').resolves(new Error(500, 'error'));
            const mock = sinon.mock(res);
            mock.expects('json').once().withArgs({msg: 'error', success: false});
            const historyController = new HistoryController(historyUsecase);
            await historyController.execute(req, res);
            expect(stub.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(500);
            mock.verify();
        })
    })
})