const utils = require('../../../utils');
const Error = require('../errors');
const User = require('../models');
const Result = require('../result');
const jwt = require('jsonwebtoken');
const config = require('../../../../config');
const Log = require('../../../services/writeLogService');
const Hash = require('../../../services/encryptService');

class RegisterUseCase {
    constructor(repo) {
        this.repo = repo;
    }

    async execute(req, res) {
            try {
                const { email, password } = req.body;
                if(utils.IsInvalid(email, 50) || !utils.ValidEmail(email)) {
                    return new Error(200, 'Email invalid');
                }
                if(utils.IsInvalid(password, 16))
                    return new Error(200, 'Password invalid');
                const users = await this.repo.find(email);
                if(users.length > 0) {
                    return new Error(200, 'Email used');
                }
                const pwdHash = await Hash.hash(password);
                const user = new User(email, pwdHash);
                const result = await this.repo.create(user);
                const payload = { email };
                    const token = jwt.sign(payload, config.secrecKey, {
                      expiresIn: '1h'
                    });
                    return new Result(200, 'Success', {token})
            } catch(err) {
                // console.log(err)
                Log.writeLog(err)
                return new Error(500, 'Error when processing request');
            }
    }
}

module.exports = RegisterUseCase;