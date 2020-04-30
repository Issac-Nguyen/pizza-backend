class OrderItemRepository {
    constructor(db) {
        this.db = db;
    }

    create(model, connection) {
        try {
            const result = this.db.execute('INSERT INTO order_items SET ?', model, connection);
            return Promise.resolve(result);
        } catch(err) {
            return Promise.reject(500, err);
        }
    }

}

module.exports = OrderItemRepository;