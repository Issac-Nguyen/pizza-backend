const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const OrderItemRepository = require('./orderItemRepository');

describe('orderItemRespository', () => {
    describe('create', () => {
        it('should return value', async () => {
            it('should return value', async () => {
                const db = {execute: () => {}};
                const orderItem = {id: 1, order_id: '1', name: '123', price: 10, currency: '$'};
                const executeStub = sinon.stub(db, 'execute').resolves([orderItem]);
                const orderItemRepository = new OrderItemRepository(db);
                const result = await orderItemRepository.create(orderItem);
                expect(result.length).to.be.greaterThan(0);
                expect(executeStub.calledOnce).to.be.true;
            })
            it('should return blank array', async () => {
                const db = {execute: () => {}};
                const executeStub = sinon.stub(db, 'execute').resolves([]);
                const orderItemRepository = new OrderItemRepository(db);
                const result = await orderItemRepository.create();
                expect(result.length).to.be.equal(0);
                expect(executeStub.calledOnce).to.be.true;
            })
        });
    })
})