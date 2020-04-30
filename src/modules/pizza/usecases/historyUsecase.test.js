const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const HistoryUsecase = require('./historyUsecase');
const Result = require('../result');

describe('historyUsecase', () => {
    describe('execute', () => {
        it('should return success', async () => {
            const orders = [{id: 1, name: 'pizza 1', price: 10, currency: '$'}];
            const repo = {findHistoryWithDate: (email) => {}}
            const stubFindAll = sinon.stub(repo, 'findHistoryWithDate').resolves(orders)
            const historyUsecase = new HistoryUsecase(repo);
            const result = await historyUsecase.execute({query: {timeStart: 1, timeEnd: 1}, body: {email: 'abc@gmail.com'}});
            expect(stubFindAll.calledOnce).to.be.true;
            expect(result.status).to.equal(200);
            expect(result.msg).to.equal('success');
            expect(result.object).to.equal(orders);
        })
        it('should return error', async () => {
            const orders = [{id: 1, name: 'pizza 1', price: 10, currency: '$'}];
            const repo = {findHistoryWithDate: (email) => {}}
            const stubFindAll = sinon.stub(repo, 'findHistoryWithDate').rejects({message: 'error'})
            const historyUsecase = new HistoryUsecase(repo);
            const result = await historyUsecase.execute({query: {timeStart: 1, timeEnd: 1}, body: {email: 'abc@gmail.com'}});
            expect(stubFindAll.calledOnce).to.be.true;
            expect(result.status).to.equal(500);
            expect(result.msg).to.equal('Error when processing request');
        })
    })
})