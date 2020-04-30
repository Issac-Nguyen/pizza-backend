const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const RegisterUsecase = require('../usecases/registerUsecase');
const RegisterController = require('./registerController');
const Error = require('../errors');
const Result = require('../result');

describe('registerController', () => {
    let status, json, res, userRepo, loginUserCase;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      repo = sinon.spy();
      registerUsecase = new RegisterUsecase(repo);
    });

    it('should return status 400 and message of return error from usecase', async () => {
        const executeStub = sinon.stub(registerUsecase, 'execute').resolves(new Error(400, 'error'));
        const registerController = new RegisterController(registerUsecase);
        await registerController.execute(sinon.spy(), res);
        expect(executeStub.calledOnce).to.be.true;
        expect(status.args[0][0]).to.equal(400);
        expect(json.args[0][0].msg).to.equal('error')
        expect(json.args[0][0].success).to.be.false;
    })
    it('should return status 500 and message of return error from usecase', async () => {
        const executeStub = sinon.stub(registerUsecase, 'execute').resolves(new Error(500, 'error'));
        const registerController = new RegisterController(registerUsecase);
        await registerController.execute(sinon.spy(), res);
        expect(executeStub.calledOnce).to.be.true;
        expect(status.args[0][0]).to.equal(500);
        expect(json.args[0][0].msg).to.equal('error')
        expect(json.args[0][0].success).to.be.false;
    })
    it('should return status 200 and message of return error from usecase', async () => {
        const executeStub = sinon.stub(registerUsecase, 'execute').resolves(new Result(200, 'success'));
        const registerController = new RegisterController(registerUsecase);
        await registerController.execute(sinon.spy(), res);
        expect(executeStub.calledOnce).to.be.true;
        expect(status.args[0][0]).to.equal(200);
        expect(json.args[0][0].msg).to.equal('success')
        expect(json.args[0][0].success).to.be.true;
    })
})