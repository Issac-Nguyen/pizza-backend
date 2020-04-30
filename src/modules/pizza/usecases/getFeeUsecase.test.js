const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const GetFeeUsecase = require('./getFeeUsecase');

describe('getFeeUsecase', function() {
    let req;
    let res;
    beforeEach(() => {
        req = {body: {}};
    })
    it('should return Incorect email or password', async function() {
        const getFeeUsecase = new GetFeeUsecase();
        const error = await getFeeUsecase.execute(req, undefined);
        expect(error.status).to.equal(200)
        expect(error.msg).to.equal('Missing customer address')
    })
    it('should return success', async function() {
        const req1 = {body: {customer_address: '123'}};
        const getFeeUsecase = new GetFeeUsecase();
        const error = await getFeeUsecase.execute(req1, undefined);
        expect(error.status).to.equal(200)
        expect(error.msg).to.equal('success')
    })
})