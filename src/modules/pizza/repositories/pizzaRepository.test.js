const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const PizzaRepository = require('./pizzaRepository');

describe('pizzaRepository', () => {
    describe('findAll', () => {
        it('findAll should be return value', async () => {
        const pizzas = [{id: 1, name: 'pizza1', price: 10, currency: '$'}];
        const db = {execute: () => {}};
        const executeStub = sinon.stub(db, 'execute').resolves(pizzas);
        const pizzaRepo = new PizzaRepository(db);
        const result = await pizzaRepo.findAll();
        expect(result.length).to.be.greaterThan(0);
        expect(executeStub.calledOnce).to.be.true;
        })
        it('findAll should be return blank array', async () => {
            const db = {execute: () => {}};
            const executeStub = sinon.stub(db, 'execute').resolves([]);
            const pizzaRepo = new PizzaRepository(db);
            const result = await pizzaRepo.findAll();
            expect(result.length).to.equal(0);
            expect(executeStub.calledOnce).to.be.true;
            })
    })
})