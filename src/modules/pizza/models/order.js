class Order {
    constructor(id, customer_name, customer_phone, customer_address, schedule, email, totalUSD, totalEUR, feeUSD, feeEUR, created_at) {
        this.id = id;
        this.customer_name = customer_name;
        this.customer_address = customer_address;
        this.customer_phone = customer_phone;
        this.schedule = schedule;
        this.totalUSD = totalUSD;
        this.totalEUR = totalEUR;
        this.feeUSD = feeUSD;
        this.feeEUR = feeEUR;
        this.email = email;
        this.created_at = created_at;
    }
}

module.exports = Order;