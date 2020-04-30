class OrderItem {
    constructor(order_id, pizza_id, url, name, price, currency) {
        this.order_id = order_id;
        this.pizza_id = pizza_id;
        this.url = url;
        this.name = name;
        this.price = price;
        this.currency = currency;
    }
}

module.exports = OrderItem;