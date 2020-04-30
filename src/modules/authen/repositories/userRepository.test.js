const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const UserRepository = require('./userRepository');
const userModel = require('../models/user');

describe("UserRepository", function() {
    describe('create', function() {
        it('should call to db', async function() {
            const execute = sinon.spy();
            const mockDbObj = {
                execute
            };

            const user = new userModel('abc@gmail.com', '123');

            const userRepo = new UserRepository(mockDbObj);
            await userRepo.create(user);
            expect(mockDbObj.execute.calledOnce).to.be.true;
        })
        it('should return success when insert user', async function() {
            const user = new userModel('abc@gmail.com', '123');
            const execute = sinon.stub().returns(Promise.resolve(user));
            const mockDbObj = {
                execute
            };

            

            const userRepo = new UserRepository(mockDbObj);
            const result = await userRepo.create(user);
            expect(mockDbObj.execute.calledOnce).to.be.true;
            expect(result.email).to.equal('abc@gmail.com')
        })
    });
    describe('find', function() {
        it('should call to db', async function() {
            const execute = sinon.spy();
            const mockDbObj = {
                execute
            };

            const email = 'abc@gmail.com';

            const userRepo = new UserRepository(mockDbObj);
            await userRepo.find(email);
            expect(mockDbObj.execute.calledOnce).to.be.true;
        });
        it('should return user when find existed user', async function() {
            const user = new userModel('abc@gmail.com', '123');
            const execute = sinon.stub().returns(Promise.resolve(user));
            const mockDbObj = {
                execute
            };

            const userRepo = new UserRepository(mockDbObj);
            const result = await userRepo.find(user.email);
            expect(mockDbObj.execute.calledOnce).to.be.true;
            expect(result.email).to.equal('abc@gmail.com')
        })
        it('should return blank array when not find user', async function() {
            const user = new userModel('abc@gmail.com', '123');
            const execute = sinon.stub().returns(Promise.resolve([]));
            const mockDbObj = {
                execute
            };

            const userRepo = new UserRepository(mockDbObj);
            const result = await userRepo.find(user.email);
            expect(mockDbObj.execute.calledOnce).to.be.true;
            expect(result.length).to.equal(0)
        })
    })
});