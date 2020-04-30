const utils = require('../../../utils');
const Error = require('../errors');
const Result = require('../result');
const Order = require('../models/order');
const OrderItem = require('../models/order_item');
const { uuid } = require('uuidv4');
const Log = require('../../../services/writeLogService');

class NewOrderUseCase {
    constructor(repo, orderItemRepo, db) {
        this.repo = repo;
        this.orderItemRepo = orderItemRepo;
        this.db = db;
    }

    async execute(req, res) {
        const {customer_name, customer_phone, customer_address, schedule, email, order_items, total, fee, created_at} = req.body;
        if(utils.IsInvalid(customer_name, 50) || utils.IsInvalid(customer_phone, 50) || utils.IsInvalid(customer_address, 50)) {
            return new Error(200, 'customer name or customer phone or customer address invalid');
        }
        const idOrder = uuid();
            const newOrder = new Order(idOrder, customer_name, customer_phone, customer_address, schedule == true ? 'immediately' : schedule, email, total, fee, created_at)
            let connection;
            try {
                connection = await this.db.beginTransaction();
                const orders = await this.repo.create(newOrder, connection);
                for(let item of order_items) {
                    const itemModel = new OrderItem(idOrder, item.pizza_id, item.url, item.name, item.price, item.currency);
                    const orderItems = await this.orderItemRepo.create(itemModel, connection);
                }
                
                await this.db.commitTransaction(connection);

                return new Result(200, 'success', orders);
            } catch (err) {
                console.log('err',err)
                if(connection)
                    await this.db.rollbackTransaction(connection);
                Log.writeLog(err.message)
                return new Error(500, 'Error when processing request');
            }
    }
}

module.exports = NewOrderUseCase;