class PizzaRepository {
    constructor(db) {
        this.db = db;
    }

    async findAll() {
        try{
            const results = await this.db.execute(`SELECT * FROM pizzas`, [])
            return Promise.resolve(results);
        } catch(err) {
            return Promise.reject(err);
        }
    }

    async findWithPage(page, limit) {
        try{
            const query = `SELECT * from pizzas order by id LIMIT ${(page - 1) * limit},${limit}`;
            const results = await this.db.execute(query, []);

            return Promise.resolve(results);
        } catch(err) {
            return Promise.reject(err)
        }
    }

    async countPage(condition, params) {
        try{
            const query = `SELECT count(1) as count FROM pizzas ${condition ? condition : ''}`;
            params = params ? params : [];
            const count = await this.db.execute(query, params);

            return Promise.resolve(count);
        } catch(err) {
            return Promise.reject(err)
        }
    }
}

module.exports = PizzaRepository;