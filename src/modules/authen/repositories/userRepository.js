class UserRepository {
    constructor(db) {
        this.db = db;
    }

    async create(userModel) {
        try {
            const results = await this.db.execute('INSERT INTO users SET ?', userModel);
            return Promise.resolve(results);
        } catch(err) {
            return Promise.reject(500, err.message);
        }
        
    }

    async update(id, userModel) {

    }

    async delete(id) {

    }

    async find(email) {
        try {
            const result = await this.db.execute(`SELECT * FROM users WHERE email = ?`, [email]);
            return Promise.resolve(result);
        } catch(err) {
            // console.log(err)
            return Promise.reject(err)
        }
    }
}

module.exports = UserRepository;