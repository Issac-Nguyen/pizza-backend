const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const OrderRepository = require('./orderRepository');

describe('orderRepository', () => {
    describe('create', () => {
        it('should return value', async () => {
            const db = {execute: () => {}};
            const orders = {id: 1, customer_name: 'name', customer_phone: '123', customer_address: 'abc', schedule: 'immediately'};
            const executeStub = sinon.stub(db, 'execute').resolves([orders]);
            const orderRepository = new OrderRepository(db);
            const result = await orderRepository.create(orders);
            expect(result.length).to.be.greaterThan(0);
            expect(executeStub.calledOnce).to.be.true;
        })
        it('should return blank array', async () => {
            const db = {execute: () => {}};
            const executeStub = sinon.stub(db, 'execute').resolves([]);
            const orderRepository = new OrderRepository(db);
            const result = await orderRepository.create();
            expect(result.length).to.be.equal(0);
            expect(executeStub.calledOnce).to.be.true;
        })
    })
    describe('findAll', () => {
        it('should return value', async () => {
            const db = {execute: () => {}};
            const orders = {id: 1, customer_name: 'name', customer_phone: '123', customer_address: 'abc', schedule: 'immediately'};
            const executeStub = sinon.stub(db, 'execute').resolves([orders]);
            const orderRepository = new OrderRepository(db);
            const result = await orderRepository.findAll(orders);
            expect(result.length).to.be.greaterThan(0);
            expect(executeStub.calledOnce).to.be.true;
        })
        it('should return blank array', async () => {
            const db = {execute: () => {}};
            const executeStub = sinon.stub(db, 'execute').resolves([]);
            const orderRepository = new OrderRepository(db);
            const result = await orderRepository.findAll();
            expect(result.length).to.be.equal(0);
            expect(executeStub.calledOnce).to.be.true;
        });
    })
})