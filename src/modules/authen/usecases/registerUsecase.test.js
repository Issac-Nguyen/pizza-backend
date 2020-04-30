const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const UserRepository = require('../repositories/userRepository');
const RegisterUsecase = require('./registerUsecase');
const User = require('../models/user');

describe('registerUsecase', () => {
    let res;
    beforeEach(() => {
        res = sinon.spy();
    })
    it('should not allow create user when email invalid', async () => {
        const req = {body: {email: '123', password: '123'}};
        const registerUsecase = new RegisterUsecase();
        const error = await registerUsecase.execute(req, res);
        expect(error.status).to.equal(200);
        expect(error.msg).to.equal('Email invalid');
    })
    it('should not allow create user when email invalid', async () => {
        const req = {body: {email: '', password: '123'}};
        const registerUsecase = new RegisterUsecase();
        const error = await registerUsecase.execute(req, res);
        expect(error.status).to.equal(200);
        expect(error.msg).to.equal('Email invalid');
    })
    it('should not allow create user when password invalid', async () => {
        const req = {body: {email: 'abc@gmail.com', password: ''}};
        const registerUsecase = new RegisterUsecase();
        const error = await registerUsecase.execute(req, res);
        expect(error.status).to.equal(200);
        expect(error.msg).to.equal('Password invalid');
    })
    it('should not allow create user when email used', async () => {
        const req = {body: {email: 'abc@gmail.com', password: '123'}};
        const repo = {find: () => {}};
        const user = new User('abc@gmail.com', '123');
        const findStub = sinon.stub(repo, 'find').returns([user])
        const registerUsecase = new RegisterUsecase(repo);
        const error = await registerUsecase.execute(req, res);
        expect(findStub.calledOnce).to.be.true;
        expect(error.status).to.equal(200);
        expect(error.msg).to.equal('Email used');
    })
    it('should allow create user when email valid, password valid and email not used', async () => {
        const req = {body: {email: 'abc@gmail.com', password: '123'}};
        const repo = {find: () => {}, create: () => {}};
        const user = new User('abc@gmail.com', '123');
        const findStub = sinon.stub(repo, 'find').returns([]);
        const createStub = sinon.stub(repo, 'create').returns([user]);
        const registerUsecase = new RegisterUsecase(repo);
        const error = await registerUsecase.execute(req, res);
        // expect(findStub.calledOnce).to.be.true;
        // expect(createStub.calledOnce).to.be.true;
        expect(error.status).to.equal(200);
        expect(error.msg).to.equal('Success');
    });
    it('should return error if any error while processing request', async () => {
        const req = {body: {email: 'abc@gmail.com', password: '123'}};
        const repo = {find: () => {}, create: () => {}};
        const user = new User('abc@gmail.com', '123');
        const findStub = sinon.stub(repo, 'find').returns([]);
        const createStub = sinon.stub(repo, 'create').returns(Promise.reject('error'));
        const registerUsecase = new RegisterUsecase(repo);
        const error = await registerUsecase.execute(req, res);
        expect(findStub.calledOnce).to.be.true;
        expect(createStub.calledOnce).to.be.true;
        expect(error.status).to.equal(500);
        expect(error.msg).to.equal('Error when processing request');
    });
})