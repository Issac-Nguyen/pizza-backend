const utils = require('../../../utils')
const Error = require('../errors')
const Result = require('../result')
const Log = require('../../../services/writeLogService');

class GetFeeUsecase {
    constructor(){}

    async execute(req, res) {
        try {
            const {customer_address} = req.body;
            if(utils.IsInvalid(customer_address)) {
                return new Error(200, 'Missing customer address');
            }
            const fee = (Math.random() * 10).toFixed(2);
            return new Result(200, 'success', {fee})
        } catch(err) {
            Log.writeLog(err.message)
            return new Error(500, err.message);
        }
    }
}

module.exports = GetFeeUsecase;