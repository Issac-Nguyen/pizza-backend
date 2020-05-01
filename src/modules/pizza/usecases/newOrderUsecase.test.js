const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const NewOrderUsecase = require('./newOrderUsecase');

describe('newOrderUsecase', () => {
    describe('execute', () => {
        it('should return success', async () => {
            const db = {beginTransaction: () => {}, commitTransaction: () => {}};
            const repo = {create: () => {}}
            const orderItemRepo = {create: () => {}}
            const orderItem = {id: '1', customer_name: 'aa', customer_address: 'add', customer_phone: '123', schedule: 'imme'};
            const orderItemItem = {id: 1, order_id: '1', name: 'name', price: 10};
            const beginTxStub = sinon.stub(db, 'beginTransaction').resolves();
            const commitTxStub = sinon.stub(db, 'commitTransaction').resolves();
            const createOrderStub = sinon.stub(repo, 'create').resolves(orderItem);
            const createOrderItemStub = sinon.stub(orderItemRepo, 'create').resolves(orderItemItem);
            const newOrderUsecase = new NewOrderUsecase(repo, orderItemRepo, db);
            const req = {body: {order_items: [{id:'1'}], customer_name: '123', customer_address: 'add', customer_phone: '123'}};
            const result = await newOrderUsecase.execute(req);
            expect(beginTxStub.calledOnce).to.be.true;
            expect(commitTxStub.calledOnce).to.be.true;
            expect(createOrderStub.calledOnce).to.be.true;
            expect(createOrderItemStub.calledOnce).to.be.true;
            expect(result.status).to.equal(200);
            expect(result.msg).to.equal('success');
        })
        it('should not call insert order item and return success', async () => {
            const db = {beginTransaction: () => {}, commitTransaction: () => {}};
            const repo = {create: () => {}}
            const orderItemRepo = {create: () => {}}
            const orderItem = {id: '1', customer_name: 'aa', customer_address: 'add', customer_phone: '123', schedule: 'imme'};
            const orderItemItem = {id: 1, order_id: '1', name: 'name', price: 10, currency: '$'};
            const beginTxStub = sinon.stub(db, 'beginTransaction').resolves();
            const commitTxStub = sinon.stub(db, 'commitTransaction').resolves();
            const createOrderStub = sinon.stub(repo, 'create').resolves(orderItem);
            const createOrderItemStub = sinon.stub(orderItemRepo, 'create').resolves(orderItemItem);
            const newOrderUsecase = new NewOrderUsecase(repo, orderItemRepo, db);
            const req = {body: {order_items: [{id:'1'}], customer_name: '123', customer_address: 'add', customer_phone: '123'}};
            const result = await newOrderUsecase.execute(req);
            expect(beginTxStub.calledOnce).to.be.true;
            expect(commitTxStub.calledOnce).to.be.true;
            expect(createOrderStub.calledOnce).to.be.true;
            expect(createOrderItemStub.callCount).to.equal(1);
            expect(result.status).to.equal(200);
            expect(result.msg).to.equal('success');
        })
        it('should return error when not in transaction', async () => {
            const db = {beginTransaction: () => {}, commitTransaction: () => {}};
            const repo = {create: () => {}}
            const orderItemRepo = {create: () => {}}
            const orderItem = {id: '1', customer_name: 'aa', customer_address: 'add', customer_phone: '123', schedule: 'imme'};
            const orderItemItem = {id: 1, order_id: '1', name: 'name', price: 10, currency: '$'};
            const beginTxStub = sinon.stub(db, 'beginTransaction').rejects();
            const commitTxStub = sinon.stub(db, 'commitTransaction').resolves();
            const createOrderStub = sinon.stub(repo, 'create').resolves(orderItem);
            const createOrderItemStub = sinon.stub(orderItemRepo, 'create').resolves(orderItemItem);
            const newOrderUsecase = new NewOrderUsecase(repo, orderItemRepo, db);
            const req = {body: {order_items: [{id:'1'}], customer_name: '123', customer_address: 'add', customer_phone: '123'}};
            const result = await newOrderUsecase.execute(req);
            expect(beginTxStub.calledOnce).to.be.true;
            expect(commitTxStub.callCount).to.equal(0);
            expect(createOrderStub.callCount).to.equal(0);
            expect(createOrderItemStub.callCount).to.equal(0);
            expect(result.status).to.equal(500);
            expect(result.msg).to.equal('Error when processing request');
        })
        it('should return error when create order fail', async () => {
            const db = {beginTransaction: () => {}, commitTransaction: () => {}, rollbackTransaction: () => {}};
            const repo = {create: () => {}}
            const orderItemRepo = {create: () => {}}
            const orderItem = {id: '1', customer_name: 'aa', customer_address: 'add', customer_phone: '123', schedule: 'imme'};
            const orderItemItem = {id: 1, order_id: '1', name: 'name', price: 10, currency: '$'};
            const beginTxStub = sinon.stub(db, 'beginTransaction').resolves('abc');
            const commitTxStub = sinon.stub(db, 'commitTransaction').resolves();
            const rollbackTxStub = sinon.stub(db, 'rollbackTransaction').resolves();
            const createOrderStub = sinon.stub(repo, 'create').rejects();
            const createOrderItemStub = sinon.stub(orderItemRepo, 'create').resolves(orderItemItem);
            const newOrderUsecase = new NewOrderUsecase(repo, orderItemRepo, db);
            const req = {body: {order_items: [{id:'1'}], customer_name: '123', customer_address: 'add', customer_phone: '123'}};
            const result = await newOrderUsecase.execute(req);
            expect(beginTxStub.calledOnce).to.be.true;
            expect(commitTxStub.callCount).to.equal(0);
            expect(rollbackTxStub.calledOnce).to.be.true;
            expect(createOrderStub.calledOnce).to.be.true;
            expect(createOrderItemStub.callCount).to.equal(0);
            expect(result.status).to.equal(500);
            expect(result.msg).to.equal('Error when processing request');
        })
        it('should return error when create order item fail', async () => {
            const db = {beginTransaction: () => {}, commitTransaction: () => {}, rollbackTransaction: () => {}};
            const repo = {create: () => {}}
            const orderItemRepo = {create: () => {}}
            const orderItem = {id: '1', customer_name: 'aa', customer_address: 'add', customer_phone: '123', schedule: 'imme'};
            const orderItemItem = {id: 1, order_id: '1', name: 'name', price: 10, currency: '$'};
            const beginTxStub = sinon.stub(db, 'beginTransaction').resolves('abc');
            const commitTxStub = sinon.stub(db, 'commitTransaction').resolves();
            const rollbackTxStub = sinon.stub(db, 'rollbackTransaction').resolves();
            const createOrderStub = sinon.stub(repo, 'create').resolves(orderItem);
            const createOrderItemStub = sinon.stub(orderItemRepo, 'create').rejects();
            const newOrderUsecase = new NewOrderUsecase(repo, orderItemRepo, db);
            const req = {body: {order_items: [{id:'1'}], customer_name: '123', customer_address: 'add', customer_phone: '123'}};
            const result = await newOrderUsecase.execute(req);
            expect(beginTxStub.calledOnce).to.be.true;
            expect(commitTxStub.callCount).to.equal(0);
            expect(rollbackTxStub.calledOnce).to.be.true;
            expect(createOrderStub.calledOnce).to.be.true;
            expect(createOrderItemStub.calledOnce).to.be.true;
            expect(result.status).to.equal(500);
            expect(result.msg).to.equal('Error when processing request');
        })
        it('should return error when commit transaction fail', async () => {
            const db = {beginTransaction: () => {}, commitTransaction: () => {}, rollbackTransaction: () => {}};
            const repo = {create: () => {}}
            const orderItemRepo = {create: () => {}}
            const orderItem = {id: '1', customer_name: 'aa', customer_address: 'add', customer_phone: '123', schedule: 'imme'};
            const orderItemItem = {id: 1, order_id: '1', name: 'name', price: 10, currency: '$'};
            const beginTxStub = sinon.stub(db, 'beginTransaction').resolves('abc');
            const commitTxStub = sinon.stub(db, 'commitTransaction').rejects();
            const rollbackTxStub = sinon.stub(db, 'rollbackTransaction').resolves();
            const createOrderStub = sinon.stub(repo, 'create').resolves(orderItem);
            const createOrderItemStub = sinon.stub(orderItemRepo, 'create').resolves();
            const newOrderUsecase = new NewOrderUsecase(repo, orderItemRepo, db);
            const req = {body: {order_items: [{id:'1'}], customer_name: '123', customer_address: 'add', customer_phone: '123'}};
            const result = await newOrderUsecase.execute(req);
            expect(beginTxStub.calledOnce).to.be.true;
            expect(commitTxStub.calledOnce).to.be.true;
            expect(rollbackTxStub.calledOnce).to.be.true;
            expect(createOrderStub.calledOnce).to.be.true;
            expect(createOrderItemStub.calledOnce).to.be.true;
            expect(result.status).to.equal(500);
            expect(result.msg).to.equal('Error when processing request');
        })
    })
})