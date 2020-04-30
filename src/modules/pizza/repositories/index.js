const OrderRepository = require('./orderRepository');
const PizzaRepository = require('./pizzaRepository');
const OrderItemRepository = require('./orderItemRepository');
const db = require('../../../db');

const orderRepository = new OrderRepository(db);
const pizzaRepository = new PizzaRepository(db);
const orderItemRepository = new OrderItemRepository(db);


module.exports = {
    orderRepository,
    pizzaRepository,
    orderItemRepository
}