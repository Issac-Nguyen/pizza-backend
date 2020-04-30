const bcrypt = require('bcrypt');

module.exports = {
    IsInvalid: (value, length) => {
        let invalid = !value || value.trim() === '' || (typeof value == 'undefined') || value == null;
        if(invalid) return invalid;
        if(length) {
            return invalid && value.length > length
        }
    },
    ValidEmail: (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    samePassword: (user, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, same) => {
                if(err)
                    return reject(err);
                resolve(same)
            });
        });
    }
}