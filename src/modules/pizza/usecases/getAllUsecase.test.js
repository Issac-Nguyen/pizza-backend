const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const GetAllUseCase = require('./getAllUsecase');
const Result = require('../result');

describe('getAllUsecase', () => {
    describe('execute', () => {
        it('should return success', async () => {
            const pizzas = [{id: 1, name: 'pizza 1', price: 10, currency: '$'}];
            const pizzaRepo = {findWithPage: () => {}, countPage: () => 1}
            const stubfindWithPage = sinon.stub(pizzaRepo, 'findWithPage').resolves(pizzas)
            const stubCount = sinon.stub(pizzaRepo, 'countPage').resolves([{count: 1}])
            const getAllUsecase = new GetAllUseCase(pizzaRepo);
            const query = {query: {page: 1}}
            const result = await getAllUsecase.execute(query);
            expect(stubfindWithPage.calledOnce).to.be.true;
            expect(stubCount.calledOnce).to.be.true;
            expect(result.status).to.equal(200);
            expect(result.msg).to.equal('success');
            expect(result.object.pizzas).to.equal(pizzas);
            expect(result.object.totalPages).to.equal(1);
            expect(result.object.totalItems).to.equal(1);
        })
        it('should return error', async () => {
            const pizzas = [{id: 1, name: 'pizza 1', price: 10, currency: '$'}];
            const pizzaRepo = {findWithPage: () => {}, countPage: () => 1}
            const stubfindWithPage = sinon.stub(pizzaRepo, 'findWithPage').rejects({message: 'error'})
            const stubCount = sinon.stub(pizzaRepo, 'countPage').resolves([{count: 1}])
            const getAllUsecase = new GetAllUseCase(pizzaRepo);
            const query = {query: {page: 1}}
            const result = await getAllUsecase.execute(query);
            expect(stubfindWithPage.calledOnce).to.be.true;
            expect(result.status).to.equal(500);
            expect(result.msg).to.equal('error');
        })
    })
})