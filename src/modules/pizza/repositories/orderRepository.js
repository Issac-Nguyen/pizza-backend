

class OrderRepository {
    
    constructor(db) {
        this.db = db;
    }

    async create(model, connection) {
        try {
            const results = await this.db.execute(`INSERT INTO orders SET ?`, model, connection);
            return Promise.resolve(results);
        } catch(err) {
            return Promise.reject(err);
        }
        
        
    }

    async updateOrder(id, model) {

    }

    async deleteOrder(id) {

    }

    async findAll(email) {
        try {
            const results = await this.db.execute(`SELECT * FROM orders where email = ? ORDER BY created_at DESC`, [email]);
            return Promise.resolve(results);
        } catch(err) {
            return Promise.reject(err);
        }
    }

    async findWithCondition(condition, params) {
        try {
            let where = 'WHERE 1=1';
            for(let c of condition) {
                where += `AND ${c} = ?`;
            }
            const query = `SELECT * FROM orders ${where}`
            const results = await this.db.execute(query, [params]);
            return Promise.resolve(results);
        } catch(err) {
            return Promise.reject(err);
        }
    }

     async findHistoryWithDate(email, timeStart, timeEnd) {
        try {
            const query = `SELECT a.*, b.* FROM orders a left join order_items b on a.id = b.order_id where email = ? and created_at between ? and ? ORDER BY created_at DESC`;
            const results = await this.db.execute(query, [email, timeStart, timeEnd]);
            return Promise.resolve(results);
        } catch(err) {
            return Promise.reject(err);
        }
     }
}

module.exports = OrderRepository;