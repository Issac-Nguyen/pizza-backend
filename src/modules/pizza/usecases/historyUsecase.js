const utils = require('../../../utils');
const Error = require('../errors');
const Result = require('../result');
const Log = require('../../../services/writeLogService');

class HistoryUseCase {
    constructor(repo) {
        this.repo = repo;
    }

    async execute(req, res) {
            try {
               const { email } = req.body;
               let {timeStart, timeEnd} = req.query;
               const orders = await this.repo.findHistoryWithDate(email, timeStart, timeEnd);
               return new Result(200, 'success', orders);
            } catch(err) {
                console.log(err)
                Log.writeLog(err.message)
                return new Error(500, 'Error when processing request');
            }
    }
}

module.exports = HistoryUseCase;