const Error = require('../errors');
const Result = require('../result');
const config = require('../../../../config');
const Log = require('../../../services/writeLogService');

class GetAllUseCase {
    
    constructor(repo) {
        this.repo = repo;
    }

    async execute(req, res) {
        try {
            const {page} = req.query;
            const pizzas = await this.repo.findWithPage(page ? page : 1, config.itemPerPage);
            let count = await this.repo.countPage();
            count = count[0].count;
            const objectReturn = {
                pizzas,
                totalPages: Math.ceil(count/config.itemPerPage),
                totalItems: count
            }
            return new Result(200, 'success', objectReturn)
        } catch(err) {
            Log.writeLog(err.message)
            return new Error(500, err.message);
        }
    }
}

module.exports = GetAllUseCase;