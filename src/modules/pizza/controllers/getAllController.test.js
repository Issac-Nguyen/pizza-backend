const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const GetallController = require('./getAllController');
const GetAllUsercase = require('../usecases/getAllUsecase');
const Error = require('../errors');

describe('getallController', () => {
    describe('execute', () => {
        let req;
        let res;
        let getAllUsecase;
        beforeEach(() => {
            req = { };
            status = sinon.stub();
            res = { status, json: function() {} };
            status.returns(res);
            const repo = sinon.spy();
            getAllUsecase = new GetAllUsercase(repo);
        });
        it('should return success with value', async () => {
            const pizzas = [{id: 1, name: 'pizza1', price: 10, currency: '$'}];
            const stub = sinon.stub(getAllUsecase, 'execute').resolves({msg: 'success', object: pizzas});
            const mock = sinon.mock(res);
            mock.expects('json').once().withArgs({data: {...pizzas}, msg: 'success', success: true});
            const getAllController = new GetallController(getAllUsecase);
            await getAllController.execute(req, res);
            expect(stub.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            mock.verify();
        })
        it('should return error', async () => {
            const stub = sinon.stub(getAllUsecase, 'execute').resolves(new Error(500, 'error'));
            const mock = sinon.mock(res);
            mock.expects('json').once().withArgs({msg: 'error', success: false});
            const getAllController = new GetallController(getAllUsecase);
            await getAllController.execute(req, res);
            expect(stub.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(500);
            mock.verify();
        })
    })
})