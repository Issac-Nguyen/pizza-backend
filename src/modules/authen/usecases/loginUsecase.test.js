const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const UserRepository = require('../repositories/userRepository');
const LoginUseCase = require('./loginUsecase');
const User = require('../models/user');

describe('loginUsecase', function() {
    let req;
    let res;
    beforeEach(() => {
        req = {body: {email: 'abc@gmail.com', password: '123'}};
    })
    it('should return Incorect email or password', async function() {
        const userRepo = new UserRepository();
        const loginUseCase = new LoginUseCase(userRepo);
        const findStub = sinon.stub(userRepo, 'find').returns(Promise.resolve([]));
        const error = await loginUseCase.execute(req, undefined);
        console.log(error)
        expect(findStub.calledOnce).to.be.true;
        expect(error.status).to.equal(200)
        expect(error.msg).to.equal('Incorect email or password')
    })
    it('should return Incorect email or password', async function() {
        const userRepo = new UserRepository();
        const loginUseCase = new LoginUseCase(userRepo);
        const user = new User('abc@gmail.com', '234');
        const findStub = sinon.stub(userRepo, 'find').returns(Promise.resolve([user]));
        const error = await loginUseCase.execute(req, undefined);
        expect(findStub.calledOnce).to.be.true;
        expect(error.status).to.equal(200)
        expect(error.msg).to.equal('Incorect email or password')
    })
    it('shoud return success', async function() {
        const user = new User('abc@gmail.com', '123');
        const userRepo = new UserRepository();
        const loginUseCase = new LoginUseCase(userRepo);
        const findStub = sinon.stub(userRepo, 'find').returns(Promise.resolve([user]));
        const result = await loginUseCase.execute(req, undefined);
        expect(findStub.calledOnce).to.be.true;
        expect(result.status).to.equal(200)
    })
})