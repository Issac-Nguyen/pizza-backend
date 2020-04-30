const UserRepository = require('./userRepository');
const db = require('../../../db');

const userRepository = new UserRepository(db);

module.exports = {
    userRepository
}