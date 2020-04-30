const bcrypt = require('bcrypt');
const config = require('../../config')

class Hash {
    constructor(saltRound) {
        this.saltRound = saltRound;
    }

    hash(data) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(data, this.saltRound, (err, hash) => {
                if(err)
                    return reject(err);
                resolve(hash);
            })
        })
    }
}

module.exports = new Hash(config.saltRounds);
