const utils = require('../../../utils');
const Error = require('../errors');
const User = require('../models');
const Result = require('../result');
const jwt = require('jsonwebtoken');
const config = require('../../../../config');
const Log = require('../../../services/writeLogService');

class LoginUseCase {
    
    constructor(repo) {
        this.repo = repo;
    }

    async execute(req, res) {
        const {email, password} = req.body;

        try {
            const users = await this.repo.find(email);
            if(users.length > 0) {
                if(await utils.samePassword(users[0], password)) {
                    const payload = { email };
                    // req.body.time = new Date().getTime();
                    const token = jwt.sign(payload, config.secrecKey, {
                      expiresIn: '1h'
                    });
                    // console.log('token', token)
                    return new Result(200, 'Success', {token})
                } else {
                    return new Error(200, 'Incorect email or password') 
                }
            } else {
                return new Error(200, 'Incorect email or password')
            }
        } catch(err) {
            Log.writeLog(err.message);
            return new Error(500, err.message);
        }
    }
}

module.exports = LoginUseCase;